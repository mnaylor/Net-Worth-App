import React, {Component} from 'react';
import axios from 'axios';
import {FormControl, FormControlLabel} from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import {RadioGroup, Radio} from '@material-ui/core/';
import {Menu} from '@material-ui/core/';
import Button from '@material-ui/core/Button';

const exchangeRateUrl = 'http://apilayer.net/api/live?access_key=6686f4cf11df150c8b06edf511020637&currencies=USD,AUD,CAD,NZD&format=1';
const exchangeRateFormat = {
    'USDUSD': 'USD',
    'USDAUD': 'AUD',
    'USDCAD': 'CAD',
    'USDNZD': 'NZD'
}

class CurrencyConverter extends Component {
    constructor() {
        super();
        this.state = {
            exchangeRates: [],
            currentExchange: 'USDUSD',
            anchorEl: null,
            setAnchorEl: null,
            open: false
        }
        this.getExchangeRates();
    }

    getExchangeRates = () => {
        axios.get(exchangeRateUrl)
        .then(res => {
            if (res.data.quotes) {
                this.setState({exchangeRates: res.data['quotes']});
            }
            else {
                this.props.setError('Failed to fetch currency exchange rates');
            }
        })
        .catch(error => {
            console.log(error);
            this.props.setError('Failed to fetch currency exchange rates');
        })
    }

    changeCurrency = event => {
        this.setState({currentExchange: event.target.value})
        this.props.updateCurrency(exchangeRateFormat[event.target.value],
                                    this.state.exchangeRates[event.target.value])
    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget, open: true});
    };

    handleClose = () => {
        this.setState({anchorEl: null, open: false});
    };

    render() {
        return (
            <Grid container>
                <Grid item xs={4}>
                    <Button onClick={this.handleMenu}>
                        Currency: {exchangeRateFormat[this.state.currentExchange]}
                    </Button>
                </Grid>
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
                    <Grid container style={{padding: 5}}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                            <RadioGroup aria-label="currency" name="currency" value={this.state.currentExchange}
                                        onChange={this.changeCurrency}>
                                <FormControlLabel value="USDUSD" control={<Radio />} label={"USD: " + this.state.exchangeRates['USDUSD']} />
                                <FormControlLabel value="USDCAD" control={<Radio />} label={"CAD" + this.state.exchangeRates['USDCAD']} />
                                <FormControlLabel value="USDAUD" control={<Radio />} label={"AUD: " + this.state.exchangeRates['USDAUD']} />
                                <FormControlLabel value="USDNZD" control={<Radio />} label={"NZD" + this.state.exchangeRates['USDNZD']} />
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
              </Menu>
            </Grid>
        )
    }
}

export default CurrencyConverter;