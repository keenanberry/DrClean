import React, { useState, createContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import RecommendationTable from './RecommendationTable';
import { useStyles } from './styles';


export default function RecommendationInterface({ payload, setIsFinishedLabeling }) {
  const totalConditions = payload.conditions.length;
  const [conditionIndex, setConditionIndex] = useState(0);
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Paper className={classes.root}>
        <Typography variant="h5" component="h2" className={classes.head}>
          <strong>Condition ({conditionIndex + 1} of {totalConditions}):</strong>
        </Typography>
        <Typography variant="h6" component="h2" className={classes.head}>
          &emsp;&emsp;&emsp;&emsp;<strong>{payload.conditions[conditionIndex].entry}</strong>
        </Typography>
        <RecommendationTable
          conditions={payload.conditions}
          conditionIndex={conditionIndex}
          setConditionIndex={setConditionIndex}
          setIsFinishedLabeling={setIsFinishedLabeling}
          columnType={payload.columnType}
          isFirstPage={conditionIndex < 1}
          isLastPage={conditionIndex >= payload.conditions.length - 1}
        />
      </Paper>
    </Grid>
  );
}
