import React from 'react';
import clsx from 'clsx';
import { lighten, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
// autosuggest options (https://material-ui.com/components/autocomplete/)

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.text.disabled,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


function createData(id, support, tumor, subtype) {
  return { id, support, tumor, subtype };
}

const headerRow = ['Existing Database Entries', 'Tumor Type', 'Tumor Subtype']; 

const metaData = {
  condition: 'Acute Lymphoblastic Leukemia (ALL) and Lymphoblastic Lymphoma',
  condNumber: '(1 of 256)',
  label: 'ALL',
  labelNumber: '(1 of 7)'
}

const rows = [
  createData(0, ['Acute Lymphoblastic Leukemia (ALL)/T Lymphoblastic Lymphoma',
  '1)Acute Lymphoblastic Leukemia2) Lymphoblastic Lymphoma',
  'Acute Lymphoblastic Leukemia and Lymphoblastic Lymphoma'], 
  'ALL', ''),
  createData(1, ['Acute Lymphoblastic Lymphoma'], 'Lymphoma', 'B-Cell Lymphoma'),
  createData(2, ['Lymphoma, Acute Lymphoblastic Leukemia'], 'Lymphoma', ''),
  createData(3, [<strong>Other</strong>],
    <TextField
      id="outlined-dense"
      label="Enter tumor type"
      //className={clsx(useStyles.textField, useStyles.dense)}
      margin="dense"
      variant="outlined"                  
    />,
    <TextField
      id="outlined-dense"
      label="Enter tumor type"
      //className={clsx(useStyles.textField, useStyles.dense)}
      margin="dense"
      variant="outlined"                  
    />
  )
];


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
    backgroundColor: 'orange',
    color: theme.palette.common.white,
  },
}));


export default function RecommendationTable() {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);

  // const [cleaned, setCleaned] = React.useState({
  //   condition: metaData['condition'],
  //   tumor: '',
  //   subtype: '',
  // });


  // function handleTextChange(e, id, name) {

  // }

  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  // function handleTextClick(e, id) {

  // }

  const otherRow = createData(rows.length, [<strong>Other</strong>],
    <TextField
      id="outlined-dense"
      label="Enter tumor type"
      className={clsx(useStyles.textField, useStyles.dense)}
      margin="dense"
      variant="outlined"
      //onClick must be added as well
      onChange={event => handleClick(event, rows.length, 'tumor')}                 
    />,
    <TextField
      id="outlined-dense"
      label="Enter tumor type"
      className={clsx(useStyles.textField, useStyles.dense)}
      margin="dense"
      variant="outlined"
      onChange={event => handleClick(event, rows.length, 'subtype')}                   
    />
  )

  function pushRows(e) {
    const pushedIndex = rows.length
    let newPushed = [];
    rows.push(otherRow)
    newPushed = newPushed.concat(selected, pushedIndex)

    setSelected(newPushed);
  }

  function handleClick(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
  
    setSelected(newSelected);
  }

  // use function to handle textfield changes
  // const handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  function handleSubmit(event) {
    event.preventDefault()
    if(selected.length) {
      //const cleanedEntries = selected.map((row) => rows[row].tumor)
      console.log(selected)
    }else {
      alert('You must make a selection.')
    }
  }

  const isSelected = id => selected.indexOf(id) !== -1;

  return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
    >
      <Paper className={classes.root}>
      <Typography variant="h5" component="h2">Condition {metaData.condNumber}</Typography>
      <Divider />
      <Typography>&nbsp;</Typography>
      <Typography variant="h6" component="h2">Possible <strong>{metaData.label}</strong> {metaData.labelNumber} : </Typography>
      <Typography variant="h6" component="h2" className={classes.head}><strong>{metaData.condition}</strong>
      {/* <Button variant="contained" component="span" className={classes.button}>
        Duplicate
      </Button> */}
      </Typography>
      <Typography>&nbsp;</Typography>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">{headerRow[0]}</StyledTableCell>
              <StyledTableCell align="left">{headerRow[1]}</StyledTableCell>
              <StyledTableCell align="left">{headerRow[2]}</StyledTableCell>
              <StyledTableCell align="left">&nbsp;</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `table-checkbox-${index}`;

                return (
                  <TableRow 
                    hover
                    onClick={event => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell scope="row">
                      <Table>
                        <TableBody>
                          {row.support.map((sup) =>
                            <TableRow key={sup}>{sup}</TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableCell>
                    <TableCell align="left">{row.tumor}</TableCell>
                    <TableCell align="left">{row.subtype}</TableCell>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId}}/>
                    </TableCell>
                  </TableRow>
                );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Button variant="contained" component="span" className={classes.foot}>
                  Back
                </Button>
                <Button variant="contained" component="span" className={classes.button} onClick={pushRows}>
                  Add Other
                </Button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button type="submit" variant="contained" component="span" className={classes.foot} onClick={handleSubmit}>
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