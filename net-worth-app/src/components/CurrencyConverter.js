import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

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
        this.setState({exchangeRates: res.data['quotes']});
    })
    .catch(error => {
        console.log(error);
    })
  }

  changeCurrency = event => {
      this.setState({currentExchange: event.target.value})
      this.props.updateCurrency(this.state.exchangeRates[event.target.value])
  }

  render() {
    return (
        <Grid container>
            <Grid item xs>
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