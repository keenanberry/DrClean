import os, sys
import urllib.request
from app import app
from flask import Flask, flash, request, redirect, render_template, url_for
from werkzeug.utils import secure_filename
import pandas as pd
import operator
from collections import Counter
import get_recommendation_dict from formatter

ALLOWED_EXTENSIONS = set(['xlsx', 'xls'])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/', methods=['GET', 'POST'])
def check_submit():
	if request.method == 'POST':
        # check if the post request has the file part
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		file = request.files['file']
		n = request.form['number']
		if n == '':
			n = '5'
		data = request.form['mySelect']
		if file.filename == '':
			flash('No file selected for uploading')
			return redirect(request.url)
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			flash('File successfully uploaded')
			return redirect(url_for('model', filename=filename, data=data, n=n))
		else:
			flash('Allowed file types are xlsx and xls')
			return redirect(request.url)

@app.route('/model/<filename>/<data>/<n>', methods=['GET', 'POST'])
def model(filename, data, n):
	if request.method == 'GET':

		df = pd.read_excel(os.path.join(app.config['UPLOAD_FOLDER'], filename))
		clean = df.loc[df.Indication.notnull()]
		unclean = df.loc[df.Indication.isnull()]

		colnames = list(clean.columns)
		coltype = None
		neighborhood = None

		if data == 'indication':
			from indication_model import get_indication_dictionary
			
			coltype = 'Tumor'
			neighborhood = get_indication_neighbors(clean, unclean, int(n))
		else if data == 'drug':
			print('do something else')

		recommendations = get_recommendation_dict(clean, unclean, neighborhood, coltype)


if __name__ == "__main__":
    app.run(debug=True)
