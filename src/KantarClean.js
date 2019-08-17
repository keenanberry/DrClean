import React, { useState } from 'react';
import Header from './components/Header';
import UploadCard from './components/UploadCard';
import DownloadCard from './components/DownloadCard';
import RecommendationInterface from './components/recommendations/RecommendationInterface';

const payload = {
    columnType: "Tumor",
    labelAsPrimaryPrefixFrequency: {
        "ALL": 1,
        "AML": 4
    },
    conditions: [{
        'entry': 'Acute Lymphoblastic Leukemia (ALL) and Lymphoblastic Lymphoma',
        'details': [{
            'type': 'ALL',
            'subtype': '',
            'support': ['1) Acute Lymphoblastic Leukemia2) Lymphoblastic Lymphoma',
                'Acute Lymphoblastic Leukemia (ALL)/T Lymphoblastic Lymphoma',
                'Acute Lymphoblastic Leukemia and Lymphoblastic Lymphoma',
                'Acute Lymphoblastic Leukemia/Lymphoma'],
            'score': 2.220446049250313e-16
        },
        {
            'type': 'Lymphoma',
            'subtype': '',
            'support': ['Lymphoma, Acute Lymphoblastic Leukemia'],
            'score': 0.05508881747693195
        }
        ]
    },
    {
        'entry': 'Adult Acute Myeloid Leukemia With t(9;11)(p21.3;q23.3); MLLT3-KMT2A',
        'details': [{
            'type': 'AML',
            'subtype': '',
            'support': ['Adult Acute Myeloid Leukemia With t(9;11)(p22.3;q23.3); MLLT3-KMT2A',
                'Acute Myeloid Leukemia With t(9;11)(p22.3;q23.3); MLLT3-KMT2A',
                'Adult Acute Myeloid Leukemia With t(9;11)(p22;q23); MLLT3-MLL',
                'Adult Acute Myeloid Leukemia'],
            'score': 0.0
        },
        {
            'type': 'AML',
            'subtype': 'Acute Myeloid Leukemia',
            'support': ['Acute Myeloid Leukemia With t(9;11)(p21.3;q23.3); MLLT3-KMT2A'],
            'score': 0.0871290708247231
        }]
    }]
};

export default function KantarClean(props) {
    /**
     * There are 3 workflow steps:
     *   - 0: UPLOAD FILE
     *   - 1: LABEL ENTRIES
     *   - 2: DOWNLOAD FILE
     */
    const [currentWorkflowStep, setCurrentWorkflowStep] = useState(0);

    function getPageComponentForWorkflowStep(workflowStep) {
        switch (currentWorkflowStep) {
            case 0:
                return (<UploadCard payload={payload} setHasUploadedFile={() => setCurrentWorkflowStep(1)} />)
            case 1:
                return (<RecommendationInterface payload={payload} setIsFinishedLabeling={() => setCurrentWorkflowStep(2)} />)
            case 2:
                return (<DownloadCard payload={payload} />)
        }
    }

    return (
        <div className="App">
            <Header currentWorkflowStep={currentWorkflowStep} setCurrentWorkflowStep={setCurrentWorkflowStep} />
            {getPageComponentForWorkflowStep(currentWorkflowStep)}
        </div>
    );
}