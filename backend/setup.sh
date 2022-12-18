sudo apt-get install ffmpeg
unzip models.zip -d .
pip3 install pipenv
pipenv install -r requirements.txt
pipenv shell
python server.py