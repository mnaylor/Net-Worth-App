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
            exchangeRate: {
                rate: 1,
                name: 'USD'
            }
        }
        this.getEntries()
        this.updateCurrency = this.updateCurrency.bind(this)
    }

    updateCurrency = (name, rate) => {
        var exchangeRate = {
            rate: rate,
            name: name
        }
        this.setState({
            exchangeRate: exchangeRate,
            assets: this.state.assets.map(entry => {
                entry['display_amount'] = this.formatAmount(entry.amount, exchangeRate);
                return entry;
            }),
            liabilities: this.state.liabilities.map(entry => {
                entry['display_amount'] = this.formatAmount(entry.amount, exchangeRate);
                return entry;
            })
        });
    }
    
    getEntries = () => {
        // mnaylor TODO handle error case
        axios.get(entries_url)
        .then(res => {
          var data = res.data.map(entry => {
              entry['display_amount'] = this.formatAmount(entry.amount, this.state.exchangeRate);
              return entry;
          });
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

    sumEntries = entries => {
        var sum = 0;
        if (entries) {
          sum = entries.reduce(
            function (accumulator, currentValue) 
            {
              return accumulator + currentValue.amount;
            }, 0);
        }
        return sum;
    }

    formatAmount = (amount, exchangeRate) => {
        return new Intl.NumberFormat('en-US', { 
          style: 'currency',
          currency: exchangeRate.name
        }).format(amount * exchangeRate.rate);
    }

    render() {
        return (
            <div>
                <CurrencyConverter updateCurrency={this.updateCurrency}></CurrencyConverter>
                <div>
                    <Grid container spacing={10} style={{padding: 24}}>
                        <Grid item xs>
                            <Table entries={this.state.assets} is_asset={true} 
                                   exchange_rate={this.state.exchangeRate} />
                        </Grid>
                        <Grid item xs>
                            <Table entries={this.state.liabilities} is_asset={false} 
                                   exchange_rate={this.state.exchangeRate} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default TableList;