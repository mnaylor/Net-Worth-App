import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function NavBar () {
    return (
      <AppBar position="static">
          <Toolbar>
              <Typography variant="h6">
                  Net Worth Calculator
              </Typography>
          </Toolbar>
    </AppBar>
    )
}

export default NavBar;