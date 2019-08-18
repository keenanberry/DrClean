import numpy as np
import pandas as pd
import string

def get_recommendation_dict(clean, unclean, neighborhood, coltype):
    distances = neighborhood[0]
    neighbors = neighborhood[1]

    clean.reset_index(inplace=True)
    clean.drop(columns='index', inplace=True)
    clean.fillna('',inplace=True)

    clean.columns = ['support', 'label', 'sublabel']
    unclean.columns = ['entry', 'label', 'sublabel']

    data = dict()
    for n in range(len(neighbors)):
        tmp = clean.loc[neighbors[n], ['support','label', 'sublabel']]
        tmp['score'] = distances[n]
        tmp = tmp.groupby(['label', 'sublabel']).agg({'support': lambda x: list(x), 'score': 'min'}).reset_index()
        tmp['len'] = tmp['support'].str.len()
        tmp.sort_values(by='len', ascending=False, inplace=True)
        #tmp['id'] = tmp.index
        data[unclean['entry'][n]] = tmp.to_dict('records')

    sorted_data = sorted(data.items(), key=lambda x: (x[1][0]['label'], x[1][0]['score']))
    
    uncleanEntries = list()
    labelFrequencies = dict()

    for entry in sorted_data:
        possible_label = entry[1][0]['label'].lower()
        if possible_label in labelFrequencies:
            labelFrequencies[possible_label] += 1
        else:
            labelFrequencies[possible_label] = 1
        
        entry_dict = {'entry': entry[0], 'details': entry[1]}
        uncleanEntries.append(entry_dict)

    final_dict = {
        'columnType': coltype,
        'primaryLabelFrequency': labelFrequencies,
        'uncleanEntries': uncleanEntries
    }

    return final_dict
