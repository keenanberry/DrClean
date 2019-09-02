import React, { useState } from 'react';
import Table from '@material-ui/core/Table';

import RecommendationTableHeader from './RecommendationTableHeader';
import RecommendationTableBody from './RecommendationTableBody';
import RecommendationTableFooter from './RecommendationTableFooter';
import { useStyles } from './styles';

function makeRowsFromDetails(raw) {
  return raw.map((conditionDetails, id) => {
    return {
      id,
      details: {
        isManualInput: conditionDetails.isManualInput || false,
        isSelected: conditionDetails.isSelected || false,
        support: conditionDetails.support,
        type: conditionDetails.type || "",
        subtype: conditionDetails.subtype || "",
        score: conditionDetails.score
      }
    }
  });
}

function oneRowIsSelected(rows) {
  let oneIsSelected = false; 
  rows.forEach(row => { oneIsSelected = row.details.isSelected || oneIsSelected; } );
  return oneIsSelected;
}

export default function RecommendationTable(props) {
  const classes = useStyles();
  const [rows, setRows] = useState(makeRowsFromDetails(props.conditions[props.conditionIndex].details));

  function handleNext(event) {
    if (oneRowIsSelected(rows)) {
      props.conditions[props.conditionIndex].details = rows.map(row => row.details);
      setRows(makeRowsFromDetails(props.conditions[props.conditionIndex + 1].details));
      props.setConditionIndex(props.conditionIndex + 1);
    }else {
      alert('You must make a selection!')
    }
  }

  function handleFinish(event) {
    props.conditions[props.conditionIndex].details = rows.map(row => row.details);
    //console.log(JSON.stringify(props.conditions, false, 2));
    props.setIsFinishedLabeling();
  }

  function handleBack(event) {
    props.conditions[props.conditionIndex].details = rows.map(row => row.details);
    setRows(makeRowsFromDetails(props.conditions[props.conditionIndex - 1].details));
    props.setConditionIndex(props.conditionIndex - 1);
  }

  function handleAddRow() {
    setRows([...rows, {
      id: rows.length,
      details: {
        isManualInput: true,
        isSelected: true,
        type: "",
        subtype: ""
      }
    }]);
  }

  return (
    <Table className={classes.table}>
      <RecommendationTableHeader columnType={props.columnType} />
      <RecommendationTableBody rows={rows} rowKeyPrefix={'RecRow_' + props.conditions[props.conditionIndex].entry} columnType={props.columnType}/>
      <RecommendationTableFooter
        handleAddRow={handleAddRow}
        handleNext={handleNext}
        handleBack={handleBack}
        handleFinish={handleFinish}
        isFirstPage={props.isFirstPage}
        isLastPage={props.isLastPage}
      />
    </Table>
  );
}