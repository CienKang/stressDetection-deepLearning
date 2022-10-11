from tensorflow import keras
import neattext.functions as nfx
import pickle
from tqdm import tqdm
from keras_preprocessing.sequence import pad_sequences
import numpy as np

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
        return self.stress_detector.predict([post_text_pad, mbti])[0][0]

if __name__=="__main__":
    import consts
    stress_model=StressModel(stress_detector_path=consts.STRESS_MODEL_PATH, 
        tokenizer_path=consts.TOKENIZER_PATH, 
        personality_detector_path=consts.MBTI_PATH)
    print(stress_model.predictStress("I am stressed"))
