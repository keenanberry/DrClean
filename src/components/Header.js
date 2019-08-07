import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";

const headerStyles = makeStyles(theme => ({
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

export default class Header extends React.Component {

  render() {
    return (
      <div className={headerStyles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={headerStyles.homeButton}
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon />
          </IconButton>
          <Typography align="left" variant="h6" className={headerStyles.title}>
            KantarClean
          </Typography>
          <Typography align="right" variant="h6" className={headerStyles.title}>
            {this.props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
    ); 
  }
}