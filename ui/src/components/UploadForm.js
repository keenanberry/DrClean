import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
  menu: {
    width: 200,
  },
}));

export default function UploadForm() {
  const classes = useStyles();
  const fileInput = React.createRef();
  const [values, setValues] = React.useState({
    file: null,
    data: '',
    number: '',
  });

  // functions to handle state changes
  // file must end in .xlsx or .xls
  // data must be selected (1 of 2 options)
  // number must be between 1 and 50
  // with all in check the submit button can go ahead and send inputs to store
    // file will be saved in public/uploads

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // onSubmit should trigger the input event
  // something like this...

  // e.preventDefault();
  // let file= values['file']
  // console.warn('this is the file:', file)
  // let reader= new FileReader();
  // reader.readAsDataURL(file);

  // reader.onload= (e) => {
  //   console.warn("binary data: ", reader.result)
  // }

  function handleSubmit() {
    if (values['file']) {
      values['file'] = fileInput.current.files[0];
      
      console.log(values)
      alert('File submitted!')
  
      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: values,
      }) 
      // }).then((response) => {
      //   response.json().then((body) => {

      //   })
      // })
    } else {
      alert('Please upload a file!')
    }
  }

  // clear form on click and on enter
  // pass input values to store on click and on enter
  // save uploaded file on click and on enter
      // should I use fetch or axios

  return (
    <form id="upload-form" className={classes.container} noValidate autoComplete="off">
      <div className="container">
        <div  className="row">
          <Button variant="contained" component="label" color="default" className={useStyles.button}>
            {/* Upload &nbsp;
            <CloudUploadIcon className={useStyles.rightIcon} /> */}
            <input
              type="file"
              ref={fileInput}
              accept=".xlsx,.xls"
              onChange={handleChange('file')}
              // style={{ display: "None" }}
            />
          </Button>
        </div>
        <div className="row">&nbsp;</div>
        <div className="row">
          Now select the file type and enter the number of existing database entries you would 
          like to compare your unclean entries to (value must range between 1 and 50).
        </div>
        <div className="row">
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
            inputProps={{ min: "1", max: "50", step: "1" }}
          />
        </div>
        <div className="row">
          <Button form="upload-form" type="submit" variant="contained" color="primary" fullWidth={true} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}