import React from 'react';
//import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const buttonStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
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
}));


export default class PageButton extends React.Component {

  render() {
    // make if statement for the multiple button types???
    return (
      <div>
        <p>Please upload your file here (accepted formats include <code>.xlsx</code> and <code>.xls</code>):</p>
      <input
        accept="xlsx"
        className={buttonStyles.input}
        id="contained-button-file"
        single
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" color="default" className={buttonStyles.button}>
        {this.props.text} <CloudUploadIcon className={buttonStyles.rightIcon} />
        </Button>
      </label>
      </div>
    ); 
  }
}


