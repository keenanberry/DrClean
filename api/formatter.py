import numpy as np
import pandas as pd
import string

def get_recommendation_dict(clean, unclean, neighborhood):
    distances = neighborhood[0]
    neighbors = neighborhood[1]

    clean.reset_index(inplace=True)
    clean.drop(columns='index', inplace=True)
    clean.fillna('',inplace=True)
    unclean.columns = ['entry', 'type', 'subtype']

    data = dict()
    for n in range(len(neighbors)):
        tmp = clean.loc[neighbors[n], ['support','type', 'subtype']]
        tmp['score'] = distances[n]
        tmp = tmp.groupby(['type', 'subtype']).agg({'support': lambda x: list(x), 'score': 'min'}).reset_index()
        tmp['len'] = tmp['support'].str.len()
        tmp.sort_values(by='len', ascending=False, inplace=True)
        data[unclean['entry'][n]] = tmp.to_dict('records')

    sorted_data = sorted(data.items(), key=lambda x: (x[1][0]['type'], x[1][0]['score']))
    
    uncleanEntries = list()
    labelFrequencies = dict()

    for entry in sorted_data:
        possible_label = entry[1][0]['type'].lower()
        if possible_label in labelFrequencies:
            labelFrequencies[possible_label] += 1
        else:
            labelFrequencies[possible_label] = 1
        
        entry_dict = {'entry': entry[0], 'details': entry[1]}
        uncleanEntries.append(entry_dict)

    final_dict = {
        'primaryLabelFrequency': labelFrequencies,
        'conditions': uncleanEntries,
    }

    return final_dict
