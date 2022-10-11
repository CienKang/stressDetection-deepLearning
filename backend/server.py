from flask import Flask, request, jsonify
from model import StressModel
from fetcher import RedditPostFetcher
import os
import consts

app = Flask(__name__)

stress_model=StressModel(stress_detector_path=consts.STRESS_MODEL_PATH, 
        tokenizer_path=consts.TOKENIZER_PATH, 
        personality_detector_path=consts.MBTI_PATH)

reddit_fetcher=RedditPostFetcher(reddit_client_id=os.getenv("REDDIT_CLIENT_ID"),
        reddit_client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
        reddit_user_agent=os.getenv("REDDIT_USER_AGENT"))

@app.route('/predict', methods=['GET', 'POST'])
def predictStress():
    content = request.json
    username=content['username']
    posts=reddit_fetcher.fetchPost(username)
    comments=reddit_fetcher.fetchComments(username)
    stress_score=0
    for post in posts:
        stress_score+=stress_model.predictStress(post)
    for comment in comments:
        stress_score+=stress_model.predictStress(comment)
    stress_score/=len(posts)+len(comments)
    print(stress_score)
    return jsonify({"stress_level": stress_score})

if __name__ == '__main__':
    app.run(host= '127.0.0.1',debug=True)