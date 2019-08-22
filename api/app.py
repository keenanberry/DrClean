import os, sys
import urllib.request
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import pandas as pd
import operator
import json
import logging
from io import BytesIO
import xlsxwriter
from collections import Counter
from formatter import get_recommendation_dict

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = set(['xlsx', 'xls'])

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['POST'])
def upload_file():
	
	task_type = request.args.get('tasktype')
	num_neighbors = request.args.get('numneighbors')

	file = request.files['file']
	filename = secure_filename(file.filename)
	file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

	df = pd.read_excel(os.path.join(app.config['UPLOAD_FOLDER'], filename))
	colnames = list(df.columns)
	df.columns = ['support', 'type', 'subtype']
	clean = df.loc[df.type.notnull()]
	clean.columns = colnames
	unclean = df.loc[df.type.isnull()]
	unclean.columns = colnames

	coltype = None
	neighborhood = None

	if task_type == 'indication':
		from indication_model import get_indication_neighbors
		coltype = 'Tumor'
		neighborhood = get_indication_neighbors(clean, unclean, int(num_neighbors))
	elif task_type == 'drug':
		print('do something else')

	recommendations = get_recommendation_dict(clean, unclean, neighborhood)
	# add addition keys to dictionary
	recommendations['columnType'] = coltype
	recommendations['columnHead'] = colnames
	recommendations['filename'] = filename
	return jsonify(**recommendations)


@app.route('/api/download', methods=['POST'])
def download_file():
	data = request.data
	data.decode()
	labeled_dict = json.loads(data)

	filename = labeled_dict['filename']
	sheetname = None
	if labeled_dict['columnType'] == 'Tumor':
		sheetname = 'Indication_Dictionary'
	elif labeled_dict['columnType'] == 'Drug':
		sheetname = 'Drug_Dictionary'

	df = pd.read_excel(os.path.join(app.config['UPLOAD_FOLDER'], filename))
	df.columns = ['support', 'type', 'subtype']
	clean = df.loc[df.type.notnull()]

	export_results = {'entry': [], 'type': [], 'subtype': []}
	for entry in labeled_dict['conditions']:
		for det in entry['details']:
			if det['isSelected'] == True:
				export_results['entry'].append(entry['entry'])
				export_results['type'].append(det['type'])
				export_results['subtype'].append(det['subtype'])
	
	newly_cleaned = pd.DataFrame(export_results)
	newly_cleaned.columns = labeled_dict['columnHead']
	clean.columns = labeled_dict['columnHead']
	export_table = pd.concat([newly_cleaned, clean], ignore_index=True, sort=False)
	export_length = len(export_table)

	output = BytesIO()
	writer = pd.ExcelWriter(output, engine='xlsxwriter')
	export_table.to_excel(writer, index=False, sheet_name=sheetname)
	workbook = writer.book
	worksheet = writer.sheets[sheetname]

	writer.close()

	output.seek(0)

	root, ext = filename.split('.')
	new_filename = root + '_completed.' + ext
	return send_file(output, attachment_filename=new_filename, as_attachment=True)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)
