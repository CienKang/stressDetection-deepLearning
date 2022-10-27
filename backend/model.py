from os import stat
from tensorflow import keras
import neattext.functions as nfx
import pickle
from tqdm import tqdm
from keras_preprocessing.sequence import pad_sequences
import numpy as np
from tensorflow.keras.initializers import glorot_uniform
import librosa

class VoiceStressModel():
    def __init__(self, voice_model_path, label_encoder_path):
        self.voice_model=keras.models.load_model(voice_model_path,custom_objects={'GlorotUniform': glorot_uniform()})
        self.label_encoder=pickle.load(open(label_encoder_path, "rb"))
        self.input_duration=3

    @staticmethod
    def _noise(data):
        """
        Adding White Noise.
        """
        # you can take any distribution from https://docs.scipy.org/doc/numpy-1.13.0/reference/routines.random.html
        noise_amp = 0.005*np.random.uniform()*np.amax(data)
        data = data.astype('float64') + noise_amp * np.random.normal(size=data.shape[0])
        return data

    @staticmethod
    def _pitch(data, sample_rate):
        """
        Pitch Tuning.
        """
        bins_per_octave = 12
        pitch_pm = 2
        pitch_change =  pitch_pm * 2*(np.random.uniform())   
        data = librosa.effects.pitch_shift(data.astype('float64'), 
                                        sample_rate, n_steps=pitch_change, 
                                        bins_per_octave=bins_per_octave)
        return data

    def predictStress(self, filename):
        x, sample_rate = librosa.load(filename, res_type='kaiser_fast',duration=self.input_duration,sr=22050*2,offset=0.5)
        X = VoiceStressModel._noise(x)
        sample_rate = np.array(sample_rate)
        mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13), axis=0)
        feature1 = mfccs
        X = VoiceStressModel._pitch(x, sample_rate)
        mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=13), axis=0)
        feature2 = mfccs
        mfccs = np.mean(librosa.feature.mfcc(y=x, sr=sample_rate, n_mfcc=13), axis=0)
        feature0 = mfccs
        feature=feature0+feature1+feature2
        extra=[0]*(259-len(feature))
        print(np.array(extra).shape)
        feature=np.concatenate((feature, np.array(extra)), axis=None)
        print(type(feature))
        if (len(feature)>259):
            feature=feature[:259]
        feature=np.expand_dims(np.array([feature]), axis=2)
        print(feature.shape)
        preds=self.voice_model.predict(feature)
        amax=preds.argmax(axis=1)
        abc = amax.astype(int).flatten()
        label=(self.label_encoder.inverse_transform((amax)))
        return (label, preds[0][amax[0]])
class StressModel():
    def __init__(self, stress_detector_path, tokenizer_path, personality_detector_path):
        self.stress_detector=keras.models.load_model(stress_detector_path)
        self.personality_detector=pickle.load(open(personality_detector_path, "rb"))
        self.tokenizer=pickle.load(open(tokenizer_path, "rb"))

    @staticmethod
    def _clean_text(text):
        text_length=[]
        cleaned_text=[]
        for sent in tqdm(text):
            sent=sent.lower()
            sent=nfx.remove_special_characters(sent)
            sent=nfx.remove_stopwords(sent)
            text_length.append(len(sent.split()))
            cleaned_text.append(sent)
        return cleaned_text,text_length

    def predictStress(self, post):
        personality=self.personality_detector.predict([post])
        post, _=StressModel._clean_text([post])
        post_seq=self.tokenizer.texts_to_sequences(post)
        post_text_pad=pad_sequences(post_seq,maxlen=50)
        i=0
        n=0
        t=0
        j=0
        if (personality[0][0]=='I'):
            i=1
        if (personality[0][1]=='N'):
            n=1
        if (personality[0][2]=='T'):
            t=1
        if (personality[0][1]=='J'):
            j=1
        i=np.reshape(np.array([i]), (1,1))
        n=np.reshape(np.array([n]), (1,1))
        t=np.reshape(np.array([t]), (1,1))
        j=np.reshape(np.array([j]), (1,1))
        mbti=np.concatenate((i,n,t,j), axis=1)
        return self.stress_detector.predict([post_text_pad, mbti])[0][0].item()

if __name__=="__main__":
    print(VoiceStressModel(voice_model_path="models/Data_noiseNshift.h5", label_encoder_path="models/lb.sav").predictStress("WhatsApp Ptt 2022-10-27 at 18.47.21.ogg"))
    import consts
    stress_model=StressModel(stress_detector_path=consts.STRESS_MODEL_PATH, 
        tokenizer_path=consts.TOKENIZER_PATH, 
        personality_detector_path=consts.MBTI_PATH)
    print(stress_model.predictStress("I am stressed"))
