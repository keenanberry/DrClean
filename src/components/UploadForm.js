import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//import NavigationIcon from '@material-ui/icons/Navigation';

const dataTypes = [
    {
        value: 'indication',
        label: 'Indication',
    },
    {
        value: 'drug',
        label: 'Drug',
    },
]; 

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(1),
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
    //justifyContent: 'center',
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  input: {
    display: 'none',
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function UploadForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    file: null,
    data: '',
    number: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <div class="container">
        <div  class="row">
          <Button variant="contained" component="span" color="default" className={useStyles.button}>
            Upload &nbsp;
              <CloudUploadIcon className={useStyles.rightIcon} />
          </Button>
        </div>
        <div class="row">
          &nbsp;
        </div>
        <div class="row">
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            className={classes.textField}
            value={values.data}
            onChange={handleChange('data')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select the file type"
            margin="normal"
            variant="outlined"
          >
            {dataTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-number"
            label="Number"
            value={values.number}
            onChange={handleChange('number')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
          />
        </div>
        <div class="row">
          <Button variant="contained" color="primary" fullWidth={true}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}