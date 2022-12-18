from flask import Flask, request, jsonify, session, redirect, url_for
from model import StressModel, VoiceStressModel
from fetcher import RedditPostFetcher
import consts
from db import Database
import os
from flask_cors import CORS
import numpy as np
from combine import Combiner

app = Flask(__name__)
app.secret_key = os.getenv("APP_SECRET_KEY")
CORS(app)
c=Combiner()
database=Database(os.getenv("MONGO_CONN_STR"))

stress_model=StressModel(stress_detector_path=consts.STRESS_MODEL_PATH, 
        tokenizer_path=consts.TOKENIZER_PATH, 
        personality_detector_path=consts.MBTI_PATH)

voice_model=VoiceStressModel(voice_model_path=consts.VOICE_MODEL_PATH, 
    label_encoder_path=consts.LABEL_ECODER_PATH)

reddit_fetcher=RedditPostFetcher(
    reddit_client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    reddit_client_id=os.getenv("REDDIT_CLIENT_ID"),
    reddit_user_agent=os.getenv("REDDIT_USER_AGENT")
    )

@app.route('/predict', methods=['GET', 'POST'])
def predictStress():
    print(request)
    content = request.json
    username=content['username']
    print(username)
    posts=reddit_fetcher.fetchPost(username)
    comments=reddit_fetcher.fetchComments(username)
    stress_score=0
    time_stress=[]
    datas=posts+comments
    del posts
    del comments
    datas=sorted(datas, key=lambda d: d["time"])
    print(datas)
    concat = " ".join([str(data["text"]) for data in datas])
    print(concat)
    personality=stress_model.personalityPredictor(concat)
    print(personality)
    bins=np.linspace(0,1)
    stresses=[]
    for i in range(len(datas)):
        stress=stress_model.predictStress(datas[i]["text"], personality)
        time_stress.append({"time": datas[i]["time"], "stress": stress})
        stresses.append(stress)   
    stress_score=float(c.calcMode(stresses, bins))
    return jsonify({"stress_level": stress_score, "time_stress": time_stress})

@app.route('/predict_voice', methods=['GET', 'POST'])
def predictVoiceStress():
    files = request.files
    file = files.get('file')

    print(file)

    with open(os.path.abspath(f'audios/audio'), 'wb+') as f:
        f.write(file.read())

    stress=voice_model.predictStress("audios/audio")
    os.remove("audios/audio")
    print(str(stress[0])+" "+str(stress[1]))
    return jsonify({"type": stress[0], "type_probab": stress[1]})

@app.route('/login', methods=['POST'])
def login():
    if request.method=='POST':
        content = request.json
        username=content['username']
        password=content['password']
        if database.findUser({"_id": username, "password": password})!=None:
            session['username']=username
            return jsonify({"status": "success"})
        return jsonify({"status": "failed"})
    else:
        return jsonify({"status": "wrong method"})

@app.route('/register', methods=['POST'])
def register():
    if request.method=='POST':
        content = request.json
        username=content['username']
        password=content['password']
        if database.findUser({"_id": username})==None:
            database.insertUser({"_id": username, "password": password})
            session['username']=username
            return jsonify({"status": "success"})
        return jsonify({"status": "failed"})
    else:
        return jsonify({"status": "wrong method"})

@app.route('/logout', methods=['POST', 'GET'])
def logout():
    try: 
        session.pop('username', None)
        return jsonify({"status": "success"})
    except Exception as err:
        print("Exception: "+err)
        return jsonify({"status": "failed"})
if __name__ == '__main__':
    app.run(host= '127.0.0.1',debug=True)