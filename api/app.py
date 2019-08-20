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

	# option 2 using FileReader on JS side
	# file_binary = request.form.get('body')
	# tmpdict = {'filename': filename, 'binary': file_binary, 'task': task_type, 'n': num_neighbors}

	file = request.files['file']
	filename = secure_filename(file.filename)
	file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

	df = pd.read_excel(os.path.join(app.config['UPLOAD_FOLDER'], filename))
	clean = df.loc[df.Indication.notnull()]
	unclean = df.loc[df.Indication.isnull()]

	colnames = list(clean.columns)
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


# @app.route('/api/download', method=['POST'])
# def download_file():
	
# 	labeled_json = request.get_json()
# 	labeled_dict = json.loads(labeled_json)
# 	filename = labeled_dict['filename']
# 	sheetname = None
# 	if labeled_dict['columnType'] == 'Tumor':
# 		sheename = 'Indication_Dictionary'

# 	df = pd.read_excel(os.path.join(app.config['UPLOAD_FOLDER'], filename))
# 	clean = df.loc[df.Indication.notnull()]

# 	export_results = {'entry': [], 'type': [], 'subtype': []}
# 	for entry in labeled_dict['conditions']:
# 		for det in entry['details']:
# 			export_results['entry'].append(entry['entry'])
# 			export_results['type'].append(det['type'])
# 			export_results['subtype'].append(det['subtype'])
	
# 	newly_cleaned = pd.DataFrame(export_results)
# 	newly_cleaned.columns = labeled_dict['columnHead']
# 	export_table = pd.concat([newly_cleaned, clean], ignore_index=True, sort=False)

# 	output = BytesIO()
# 	writer = pd.ExcelWriter(output, engine='xlsxwriter')
# 	export_table.to_excel(writer, index=False, sheet_name=sheetname)
# 	workbook = writer.book
# 	worksheet = writer.sheets[sheetname]

# 	writer.close()

# 	output.seek(0)

# 	root, ext = filename.split('.')
# 	new_filename = root + '_completed.' + ext
# 	return send_file(output, attachment_filename=new_filename, as_attachment=True)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)  # debug=True
