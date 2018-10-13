import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';


const contain = {
    flexGrow: 1,
    palette: {
        primary: {
            main: '#3f50b5' 
        }
    }
};


class Header extends Component {
    render() {
        return (
        <div style={contain}>
            <AppBar position="static">
            <Toolbar style={{justifyContent: 'center'}}>
            <Typography variant="h5" color="inherit" >
            QUICKNYC
            </Typography>
            </Toolbar>
        </AppBar>
        </div>
        );
    }
}

export default Header;
