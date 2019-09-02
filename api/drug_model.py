import numpy as np
import pandas as pd
import re
import string
from scipy.sparse import hstack
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors


def augment_data(clean):
    clean.fillna('', inplace=True)
    aug_data = {'support': [], 'type': [], 'subtype': []}
    for drug_name, search_term in zip(list(clean['type']), list(clean['subtype'])):
        if drug_name.lower() != 'remove':
            terms = str(search_term).split(':', 1)
            main_name = terms[0]
            aug_data['support'].append(main_name)
            aug_data['type'].append(drug_name)
            aug_data['subtype'].append(search_term)
            if len(terms) > 1:
                alt_support = terms[1].split(',')
                for alt in alt_support:
                    aug_data['support'].append(alt)
                    aug_data['type'].append(drug_name)
                    aug_data['subtype'].append(search_term)
            else:
                continue
        else:
            continue
    
    aug_df = pd.DataFrame(aug_data)
    augclean = pd.concat([clean, aug_df], ignore_index=True)
    augclean.drop_duplicates(inplace=True)
    return augclean

def normalize_text(df):
    df['support'] = df.loc[:,'support'].str.replace('[\W+]', ' ')
    df['support'] = df.loc[:,'support'].str.lower()
    df['support'] = df.loc[:,'support'].str.strip()
    return df

def get_drug_neighbors(clean, unclean, neighbors):
    # function returns the new augmented clean df
    augclean = augment_data(clean)
    cleancopy = normalize_text(augclean.copy())
    uncleancopy = normalize_text(unclean.copy())

    X_train = list(cleancopy['support'])
    X_test = list(uncleancopy['support'])

    # vectorize text data (word & character)
    word_vectorizer = TfidfVectorizer(
        analyzer='word', 
        ngram_range=(1,1), 
        max_df = 0.40, 
        min_df = 1, 
        max_features=10000, 
        stop_words = 'english'
    )
    train_word = word_vectorizer.fit_transform(X_train)
    test_word = word_vectorizer.transform(X_test)

    char_vectorizer = TfidfVectorizer(
        analyzer='char', 
        ngram_range=(4,4), 
        max_df = 0.40, 
        min_df = 1, 
        max_features=40000, 
        stop_words = 'english')
    train_char = char_vectorizer.fit_transform(X_train)
    test_char = char_vectorizer.transform(X_test)

    train_vector = hstack([train_char, train_word])
    test_vector = hstack([test_char, test_word])

    # build neighborhood model
    nn = NearestNeighbors(n_neighbors=neighbors, metric='cosine', p=1)
    nn.fit(train_vector)
    neighborhood = nn.kneighbors(test_vector, return_distance=True)

    return neighborhood, augclean
