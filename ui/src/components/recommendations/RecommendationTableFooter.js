import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { useStyles } from './styles';

export default function RecommendationTableFooter({
  handleNext,
  handleFinish,
  handleBack,
  handleAddRow,
  isFirstPage,
  isLastPage
}) {
  const classes = useStyles();

  return (
    <TableFooter>
      <TableRow>
        <TableCell>
          <Button variant="contained" component="span" className={classes.foot} onClick={handleBack} disabled={isFirstPage}>
            Back
          </Button>
          <Button variant="contained" component="span" className={classes.button} onClick={handleAddRow}>
            Add Other
          </Button>
        </TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>
          {
            isLastPage
            ? <Button type="submit" variant="contained" component="span" className={classes.foot} onClick={handleFinish}>Finish</Button>
            : <Button type="submit" variant="contained" component="span" className={classes.foot} onClick={handleNext}>Next</Button>
          }
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}