import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Table from '../components/Table';
import CurrencyConverter from '../components/CurrencyConverter';

const entries_url = 'http://localhost:5000/entries';

class TableList extends Component {
    constructor() {
        super()
        this.state = {
            assets: [],
            liabilities: [],
            sumAssets: 0,
            sumLiabilities: 0,
            currentExchangeRate: 1
        }
        this.getEntries()
        this.updateCurrency = this.updateCurrency.bind(this)
    }

    updateCurrency = exchangeRate => {
        this.setState({
            currentExchangeRate: exchangeRate,
            assets: this.addDisplayAmount(this.state.assets, exchangeRate),
            liabilites: this.addDisplayAmount(this.state.liabilities, exchangeRate),
            sumAssets: this.sumEntries(this.state.assets),
            sumLiabilities: this.sumEntries(this.state.liabilities)
        });
    }
    
    getEntries = () => {
        // mnaylor TODO handle error case
        axios.get(entries_url)
        .then(res => {
          var data = this.addDisplayAmount(res.data, this.state.currentExchangeRate);
          const assets = data.filter(entry => entry['is_asset']);
          const liabilities = data.filter(entry => !entry['is_asset']);

          this.setState({
              'assets': assets, 
              'liabilities': liabilities,
              'sumAssets': this.sumEntries(assets),
              'sumLiabilities': this.sumEntries(liabilities)
            });
        })
    }

    sumEntries = (entries) => {
        var sum = 0;
        if (entries) {
          sum = entries.reduce(
            function (accumulator, currentValue) 
            {
              return accumulator + currentValue.display_amount;
            }, 0);
        }
        return sum;
      }

    addDisplayAmount = (data, multiplier) => {
        return data.map(entry => {
            entry['display_amount'] = entry['amount'] * multiplier;
            return entry;
        })
    }

    render() {
        return (
            <div>
                <CurrencyConverter updateCurrency={this.updateCurrency}></CurrencyConverter>
                <div>
                    <Grid container spacing={10} style={{padding: 24}}>
                        <Grid item xs>
                            <Table entries={this.state.assets} is_asset={true} sum={this.state.sumAssets} />
                        </Grid>
                        <Grid item xs>
                            <Table entries={this.state.liabilities} is_asset={false} sum={this.state.sumLiabilities} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default TableList;