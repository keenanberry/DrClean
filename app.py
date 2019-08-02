from flask import Flask

UPLOAD_FOLDER = 'uploads'

app = Flask(__name__)

app.secret_key = "kantarclean00"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16*1024*1024
