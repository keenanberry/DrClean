import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
//import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
//import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios';

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

//export default function UploadForm({ payload, setConditions, setColumnType, setHasUploadedFile }) {
export default function UploadForm({ payload, setHasUploadedFile }) {
  const classes = useStyles();
  const fileInput = React.createRef();

  const [textValues, setTextValues] = React.useState({
    tasktype: '',
    numneighbors: '',
  });

  const handleInputChange = name => event => {
    setTextValues({ ...textValues, [name]: event.target.value });
  };

  function handleUpload(event) {
    event.preventDefault();

    if (fileInput.current.files[0]) {
      var queryString = Object.keys(textValues)
        .map(key => key + '=' + textValues[key])
        .join('&');

      const url = `http://localhost:5000/api/upload?${queryString}`;

      const data = new FormData();
      data.append('file', fileInput.current.files[0]);

      fetch(url, {
        method: 'POST',
        body: data,
      }).then(response => {
          return response.text();
        })
        .then((response) => {
          let responseJson = JSON.parse(response);
          //console.log(responseJson);
          //setConditions(responseJson.conditions);
          //setColumnType(responseJson.columnType);
          payload.conditions = responseJson.conditions;
          payload.columnType = responseJson.columnType;
          payload.columnHead = responseJson.columnHead;
          payload.primaryLabelFrequency = responseJson.primaryLabelFrequency;
          payload.filename = responseJson.filename;
          setHasUploadedFile();
        })
        .catch((error) => {
          console.error(error);
        });
    }else {
      alert('Please upload your file!');
    }
      // option 2 uses FileReader() ... doesn't work
      // let files = fileInput.current.files;
      // let reader = new FileReader();
      // reader.readAsBinaryString(files[0]);

      // reader.onload = (e) => {
      //   console.log(e.target.result)
      //   const url = `http://localhost:5000/api/upload?${queryString}`;
      //   console.log(url)
      //   const body={file:e.target.result}
      //   return axios.post(url, body)
      //     .then(response => console.log('SUCCESS!'))
      //     .catch(response => console.log('FAIL!'))
      // }

    
  }

  return (
    <form id="upload-form" className={classes.container} noValidate autoComplete="off">
      <div className="container">
        <div  className="row">
          <Button variant="contained" component="label" color="default" className={useStyles.button}>
            <input
              type="file"
              ref={fileInput}
              accept=".xlsx,.xls"
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
            value={textValues.tasktype}
            onChange={handleInputChange('tasktype')}
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
            value={textValues.numneighbors}
            onChange={handleInputChange('numneighbors')}
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
          <Button form="upload-form" type="submit" variant="contained" color="primary" fullWidth={true} onClick={handleUpload}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}