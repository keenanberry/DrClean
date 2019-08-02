import os, sys
import urllib.request
from app import app
from flask import Flask, flash, request, redirect, render_template
from werkzeug.utils import secure_filename
import pandas as pd
import operator
from collections import Counter

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
		#data_type = request.form.get('type', None)
		if file.filename == '':
			flash('No file selected for uploading')
			return redirect(request.url)
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			flash('File successfully uploaded')
			return redirect('/')
		else:
			flash('Allowed file types are xlsx and xls')
			return redirect(request.url)

@app.route('/recommend', methods=['GET', 'POST'])
def recommend():
	file = request.files['file']
	df = pd.read_excel(file.filename)
	n = request.form['neighbors']
	if request.form['type'] == 'indication':

		from indication_model import get_indication_neighbors
		
		clean = df.loc[df.Indication.notnull()].copy()
		unclean = df.loc[df.Indication.isnull()].copy()
   		
		neighborhood = get_indication_neighbors(clean.copy(), unclean.copy(), n)
		distances = neighborhood[0]
		neighbors = neighborhood[1]

		clean.fillna('',inplace=True)
		clean.reset_index(inplace=True)
		clean.drop(columns='index', inplace=True)

		label0 = list(clean.loc[neighbors.tolist()[0], 'Indication'])
		sortedVotes = sorted(Counter(label0).items(), key=operator.itemgetter(1), reverse=True)
		return render_template('success.html', indication=sortedVotes[0][0])

	# elif request.form['type'] == 'drug':
	# 	from drug_model import get_drug_neighbors

	# 	clean = df.loc[df.Drug.notnull()].copy()
	# 	unclean = df.loc[df.Drug.isnull()].copy()

	# 	neighbors = get_drug_neighbors(clean, unclean, n)


if __name__ == "__main__":
    app.run(debug=True)