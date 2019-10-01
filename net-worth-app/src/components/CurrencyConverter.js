import React, {Component} from 'react';
import axios from 'axios';
import {FormControl, FormControlLabel} from '@material-ui/core/';
import Grid from '@material-ui/core/Grid';
import {RadioGroup, Radio} from '@material-ui/core/';
import Typography from '@material-ui/core/Typography';

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
          currentExchange: 'USDUSD'
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

  render() {
    return (
        <Grid container>
            <Grid item xs={4}>
                <Typography variant="h6">
                    Display Currency:
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <FormControl component="fieldset">
                <RadioGroup row aria-label="currency" name="currency" value={this.state.currentExchange} 
                            onChange={this.changeCurrency}>
                    <FormControlLabel value="USDUSD" control={<Radio />} label="USD" />
                    <FormControlLabel value="USDCAD" control={<Radio />} label="CAD" />
                    <FormControlLabel value="USDAUD" control={<Radio />} label="AUD" />
                    <FormControlLabel value="USDNZD" control={<Radio />} label="NZD" />
                </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    )
  }
}

export default CurrencyConverter;