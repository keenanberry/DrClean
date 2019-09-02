import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import ToggleButton from "@material-ui/lab/ToggleButton"; 

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header(props) {
  const classes = useStyles();

  function handleSetToUploadStep() {
    if (props.currentWorkflowStep > 0) {
      props.setCurrentWorkflowStep(0);
    }
  }

  function handleSetToLabelStep() {
    if (props.currentWorkflowStep === 0) {
      alert('Cannot Proceed to Label Step Until a File is Uploaded!');
    }

    if (props.currentWorkflowStep === 2) {
      props.setCurrentWorkflowStep(1);
    }
  }

  function handleSetToDownloadStep() {
    if (props.currentWorkflowStep < 2) {
      alert('Cannot Proceed to Download Step Until a File is Uploaded and Entries are Labeled!');
    }
  }

  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.homeButton}
          color="inherit"
          aria-label="menu"
          onClick={handleSetToUploadStep}
        >
          <HomeIcon />
        </IconButton>
        <Typography align="left" variant="h6" className={classes.title}>
          KantarClean
        </Typography>
        <ToggleButtonGroup>
          <ToggleButton variant="contained" selected={props.currentWorkflowStep === 0} onClick={handleSetToUploadStep}>Step 1. Upload File</ToggleButton> 
          <ToggleButton variant="contained" selected={props.currentWorkflowStep === 1} onClick={handleSetToLabelStep}>Step 2. Label Entries</ToggleButton> 
          <ToggleButton variant="contained" selected={props.currentWorkflowStep === 2} onClick={handleSetToDownloadStep}>Step 3. Download File</ToggleButton> 
        </ToggleButtonGroup>
      </Toolbar>
    </AppBar>
  </div>
  ); 
}