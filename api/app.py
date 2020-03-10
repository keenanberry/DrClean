import os, uuid, sys
import urllib.request
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from azure.storage.blob import BlockBlobService
from azure.storage.blob.baseblobservice import BaseBlobService
from azure.storage.blob import BlobPermissions
from datetime import datetime, timedelta
import pandas as pd
import operator
import json
import logging
from io import BytesIO
import xlsxwriter
from collections import Counter
from formatter import get_recommendation_dict

ALLOWED_EXTENSIONS = set(['xlsx', 'xls'])
# blob service parameters
ACCOUNT = os.getenv('ACCOUNT_NAME')
KEY = os.getenv('ACCOUNT_KEY')
CONTAINER = 'uploads'
# blob service
BLOB = BlockBlobService(account_name=ACCOUNT, account_key=KEY)

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/upload', methods=['GET','POST','OPTIONS'])
def upload_file():
	
	task_type = request.args.get('tasktype')
	num_neighbors = request.args.get('numneighbors')

	file = request.files['file']
	filename = secure_filename(file.filename)
	file.seek(0)
	# upload excel file to azure blob storage
	BLOB.create_blob_from_stream(CONTAINER, filename, file)

	sas_token = BLOB.generate_blob_shared_access_signature(
		CONTAINER, 
		filename, 
		permission=BlobPermissions.READ, 
		expiry=datetime.utcnow() + timedelta(hours=1)
	)
	# make blob readable from pandas read_excel method
	blob_url_with_sas = BLOB.make_blob_url(CONTAINER, filename, sas_token=sas_token)

	df = pd.read_excel(blob_url_with_sas)
	colnames = list(df.columns)
	df.columns = ['support', 'type', 'subtype']
	clean = df.loc[df.type.notnull()]
	unclean = df.loc[df.type.isnull()]

	coltype = None
	neighborhood = None

	print('entering model...')
	if task_type == 'indication':
		from indication_model import get_indication_neighbors
		coltype = 'Tumor'
		neighborhood = get_indication_neighbors(clean, unclean, int(num_neighbors))
	elif task_type == 'drug':
		from drug_model import get_drug_neighbors
		coltype = 'Drug'
		# reassign clean for drug data because search_terms 
			# are used to augment existing data
		neighborhood, clean = get_drug_neighbors(clean, unclean, int(num_neighbors))
	
	print('neighborhood has been returned... heres an example distance:', neighborhood[0][0])
	recommendations = get_recommendation_dict(clean, unclean, neighborhood)
	# add addition keys to dictionary
	recommendations['columnType'] = coltype
	recommendations['columnHead'] = colnames
	recommendations['filename'] = filename
	print('recommendation dictionary length is...', len(recommendations))
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

	sas_token = BLOB.generate_blob_shared_access_signature(
		CONTAINER, 
		filename, 
		permission=BlobPermissions.READ, 
		expiry=datetime.utcnow() + timedelta(hours=1)
	)
	# make blob readable from pandas read_excel method
	blob_url_with_sas = BLOB.make_blob_url(CONTAINER, filename, sas_token=sas_token)

	df = pd.read_excel(blob_url_with_sas)
	df.columns = ['entry', 'type', 'subtype']
	clean = df.loc[df.type.notnull()]

	export_results = {'entry': [], 'type': [], 'subtype': []}
	for entry in labeled_dict['conditions']:
		# 'conditions' is used for all classification tasks 
			# because it's used in the js code
		for det in entry['details']:
			if det['isSelected'] == True:
				export_results['entry'].append(entry['entry'])
				export_results['type'].append(det['type'])
				export_results['subtype'].append(det['subtype'])
	
	newly_cleaned = pd.DataFrame(export_results)

	export_table = pd.concat([newly_cleaned, clean], ignore_index=True, sort=False)
	export_table.columns = labeled_dict['columnHead']

	output = BytesIO()
	writer = pd.ExcelWriter(output, engine='xlsxwriter')
	export_table.to_excel(writer, index=False, sheet_name=sheetname)
	# necessary ?
	workbook = writer.book
	worksheet = writer.sheets[sheetname]

	writer.close()

	output.seek(0)

	root, ext = filename.split('.')
	new_filename = root + '_completed.' + ext
	return send_file(output, attachment_filename=new_filename, as_attachment=True)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
