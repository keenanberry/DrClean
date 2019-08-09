import React from 'react';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  head: {
    color: theme.palette.primary.main,
  },
  foot: {
    margin: theme.spacing(1),
    //backgroundColor: theme.palette.error.main,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    //backgroundColor: theme.palette.error.main,
    backgroundColor: 'orange',
    color: theme.palette.common.white,
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.text.disabled,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function createData(support, tumor, subtype) {
  return { support, tumor, subtype };
}

function createHeaderData(conditionCount, totalCount, labelCount, totalLabelCount, condition) {
  return { conditionCount, totalCount, labelCount, totalLabelCount, condition };
}

const rows = [
  createData(['Acute Lymphoblastic Leukemia (ALL)/T Lymphoblastic Lymphoma',
  '1)Acute Lymphoblastic Leukemia2) Lymphoblastic Lymphoma',
  'Acute Lymphoblastic Leukemia and Lymphoblastic Lymphoma'], 
  'ALL', ''),
  createData(['Acute Lymphoblastic Lymphoma'], 'Lymphoma', 'B-Cell Lymphoma'),
  createData(['Lymphoma, Acute Lymphoblastic Leukemia'], 'Lymphoma', ''),
];

const headRows = [
  { id: 'support', numeric: false, disablePadding: true, label: 'Existing Database Entries' },
  { id: 'tumor', numeric: false, disablePadding: false, label: 'Tumor Type' },
  { id: 'subtype', numeric: false, disablePadding: false, label: 'Tumor Subtype' },
];

// const dataHead = [
//   createHeaderData([4, 256, 1, 7, 'Acute Lymphoblastic Leukemia (ALL) and Lymphoblastic Lymphoma'])
// ]

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    >
      <Paper className={classes.root}>
      <Typography gutterBttom variant="h5" component="h2">Condition (1 of 256)</Typography>
      <Divider />
      <Typography gutterBttom>&nbsp;</Typography>
      <Typography gutterBttom variant="h6" component="h2">Possible <strong>ALL</strong> (1 of 7) : </Typography>
      <Typography gutterBttom variant="h6" component="h2" className={classes.head}><strong>Acute Lymphoblastic Leukemia (ALL) and Lymphoblastic Lymphoma &nbsp; </strong>
      <Button variant="contained" component="span" className={classes.button}>
        Duplicate
      </Button>
      </Typography>
      
      <Typography gutterBttom>&nbsp;</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell><strong>Existing Database Entries</strong></StyledTableCell>
              <StyledTableCell align="left"><strong>Tumor Type</strong></StyledTableCell>
              <StyledTableCell align="left"><strong>Tumor Subtype</strong></StyledTableCell>  
              <StyledTableCell align="left"><Checkbox/></StyledTableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.support}>
                <TableCell component="th" scope="row">
                  <TableRow>{row.support[0]}</TableRow>
                  <TableRow>{row.support[1]}</TableRow>
                  <TableRow>{row.support[2]}</TableRow>
                </TableCell>
                <TableCell align="left">{row.tumor}</TableCell>
                <TableCell align="left">{row.subtype}</TableCell>
                <TableCell><Checkbox/></TableCell>
              </TableRow>
            ))}
            <TableRow key='other'>
              <TableCell component="th" scope="row"><strong>Other</strong></TableCell>
              <TableCell align="left">
                <div>
                  <TextField
                    id="outlined-dense"
                    label="Enter tumor type"
                    className={clsx(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"                  
                  />
                </div>
              </TableCell>
              <TableCell align="left">
                <div>
                  <TextField
                    id="outlined-dense"
                    label="Enter tumor subtype"
                    className={clsx(classes.textField, classes.dense)}
                    margin="dense"
                    variant="outlined"                  
                  />
                </div>
              </TableCell>
              <TableCell><Checkbox/></TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Button variant="contained" component="span" className={classes.foot}>
                  Back
                </Button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button variant="contained" component="span" className={classes.foot}>
                  Next
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    </Grid>
  );
} 
// createData(['Other', 
// <TextField
// id="outlined-dense"
// label="Dense"
// className={clsx(useStyles.textField, useStyles.dense)}
// margin="dense"
// variant="outlined"/>,
// <TextField
// id="outlined-dense"
// label="Dense"
// className={clsx(useStyles.textField, useStyles.dense)}
// margin="dense"
// variant="outlined"/>]),