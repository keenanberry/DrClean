import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.text.disabled,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function RecommendationTableHeader({
  columnType
}) {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell align="left">Existing Database Entries</StyledTableCell>
        <StyledTableCell align="center">{columnType} Type</StyledTableCell>
        <StyledTableCell align="center">{columnType} Subtype</StyledTableCell>
        <StyledTableCell align="center">Is Match</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}