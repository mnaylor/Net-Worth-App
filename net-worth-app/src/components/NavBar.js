import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Menu from '@material-ui/core/Menu';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

const exchangeRateUrl = 'http://apilayer.net/api/live?access_key=6686f4cf11df150c8b06edf511020637&currencies=USD,AUD,CAD,GBP&format=1';
const exchangeRateFormat = {
    'USDUSD': 'USD',
    'USDAUD': 'AUD',
    'USDCAD': 'CAD',
    'USDGBP': 'GBP'
}

class NavBar extends Component {
  constructor() {
      super();
      this.state = {
          anchorEl: null,
          open: false,
          exchangeRates: [],
          currentExchange: 'USDUSD'
      }
      this.getExchangeRates();
  }

  getExchangeRates = () => {
    axios.get(exchangeRateUrl)
    .then(res => {
        this.setState({exchangeRates: res.data['quotes']});
    })
    .catch(error => {
        console.log(error);
    })
  }

  classes = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    }
  }))

  handleChange = event => {
    console.log('change');
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget, open: true});
  };

  handleClose = () => {
    this.setState({anchorEl: null, open: false});
  };

  changeCurrency = event => {
      this.setState({currentExchange: event.target.value})
      this.handleClose();
  }

  render() {
    return (
    <div className={this.classes.root}>
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" className={this.classes.title}>
            Net Worth Calculator
            </Typography>
            <div>
                <Button className={this.classes.button} onClick={this.handleMenu}>
                    {exchangeRateFormat[this.state.currentExchange]}
                </Button>
                <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={this.state.open}
                onClose={this.handleClose}
                >
                    <FormControl component="fieldset">
                    <RadioGroup aria-label="currency" name="currency" value={this.state.currentExchange} onChange={this.changeCurrency}>
                        <FormControlLabel value="USDUSD" control={<Radio />} label="USD" />
                        <FormControlLabel value="USDCAD" control={<Radio />} label="CAD" />
                    </RadioGroup>
                    </FormControl>
                </Menu>
            </div>
        </Toolbar>
        </AppBar>
    </div>
    )
  }
}

export default NavBar;