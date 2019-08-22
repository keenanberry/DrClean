import React, { useState } from 'react';
import Header from './components/Header';
import UploadCard from './components/UploadCard';
import DownloadCard from './components/DownloadCard';
import RecommendationInterface from './components/recommendations/RecommendationInterface';

const payload = {}; 

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
                //return (<UploadCard payload={payload} setConditions={setConditions} setColumnType={setColumnType} setHasUploadedFile={() => setCurrentWorkflowStep(1)} />)
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