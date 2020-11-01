import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/core/icons/Menu';
import PropTypes from 'prop-types';

AppShell.propTypes = {};

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 'auto',
  },
};

const [toggle, setToggle] = useState({ toggle: !toggle });

function handleDrawerToggle() {
  setToggle({ toggle: !toggle });
}

function AppShell(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <IconButton
          className={classes.menuButton}
          color="inherit"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Drawer open={toggle}>
        <MenuItem onClick={handleDrawerToggle}>Home</MenuItem>
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(AppShell);
