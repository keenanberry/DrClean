import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button"; 

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

export default function Header() {
  const classes = useStyles(); 
  const [uploadButtonState, setUploadButtonState] = useState("primary");
  const [labelButtonState, setLabelButtonState] = useState("primary");
  const [downloadButtonState, setDownloadButtonState] = useState("primary");

  function enforceButtonSelection(setter) {
    [setUploadButtonState, setLabelButtonState, setDownloadButtonState].forEach(fn => { fn("primary"); });
    setter("secondary");
  } 
  // 1. clear selection of buttons
  // 2. apply selection of buttons to one clicked
  // 3. activate the components that are part of that screen
  return (
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.homeButton}
          color="inherit"
          aria-label="menu"
        >
          <HomeIcon />
        </IconButton>
        <Typography align="left" variant="h6" className={classes.title}>
          KantarClean
        </Typography>
        <Button variant="contained" color={uploadButtonState} onClick={enforceButtonSelection.bind(null, setUploadButtonState)}>Upload</Button> 
        <Button variant="contained" color={labelButtonState} onClick={enforceButtonSelection.bind(null, setLabelButtonState)}>Label</Button> 
        <Button variant="contained" color={downloadButtonState} onClick={enforceButtonSelection.bind(null, setDownloadButtonState)}>Download</Button> 
      </Toolbar>
    </AppBar>
  </div>
  ); 
}