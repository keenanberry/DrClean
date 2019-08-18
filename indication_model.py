import numpy as np
import pandas as pd
import re
import string
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.neighbors import NearestNeighbors


def normalize_text(text):
    for i in range(len(text)):
        s = text[i]

        if isinstance(s, str):
            sp = re.sub('\W+', ' ', s.lower())
            sp = re.sub(r'[0-9]+', '', sp)
            sp = re.sub(r'  +', ' ', sp)
            text[i] = sp.strip()
        # remove floats/ints
        elif isinstance(s, (int, float)):
            text[i] = 'null' 

    return text


def process_clean_indication(clean_data):
    clean_data['Condition'].fillna('null', inplace=True)
    clean_data['Condition'].replace('', 'null', inplace=True)

    clean_data['Indication'] = clean_data.loc[:,'Indication'].str.lower() 
    clean_data['Condition'] = normalize_text(list(clean_data['Condition']))

    return clean_data


def process_unclean_indication(unclean_data):
    unclean_data['Condition'] = normalize_text(list(unclean_data['Condition']))

    return unclean_data


def get_indication_neighbors(clean, unclean, neighbors):
    cleancopy = process_clean_indication(clean.copy())
    uncleancopy = process_unclean_indication(unclean.copy())
    
    X_train = list(cleancopy['Condition'])
    X_test = list(uncleancopy['Condition'])

    # build and train model
    cv = CountVectorizer(analyzer='word', max_df = 0.40, min_df = 1, ngram_range=(1,1), stop_words = 'english')
    train_vector = cv.fit_transform(X_train)
    test_vector = cv.transform(X_test)
    
    nn = NearestNeighbors(n_neighbors=neighbors, metric='cosine', p=1)
    nn.fit(train_vector)
    neighborhood = nn.kneighbors(test_vector, return_distance=True)

    return(neighborhood)
    