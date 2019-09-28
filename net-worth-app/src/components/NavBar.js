import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const NavBar = () => {
    return(
        <div>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    Net Worth Calculator
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
} 

export default NavBar;