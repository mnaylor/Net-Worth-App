import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Table from '../components/Table';
import CurrencyConverter from '../components/CurrencyConverter';
import { Typography } from '@material-ui/core';
import ErrorMessage from '../components/ErrorMessage';

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
            },
            sum: {
                asset: 0,
                liability: 0,
                formatted: null
            },
            error: null
        }
        this.getEntries()
        this.updateSum = this.updateSum.bind(this);
        this.updateCurrency = this.updateCurrency.bind(this)
        this.setError = this.setError.bind(this);
        this.clearError = this.clearError.bind(this);
    }

    setError = error => {
        this.setState({error: error});
    }

    clearError = () => {
        this.setState({error: null});
    }

    updateCurrency = (name, rate) => {
        var exchangeRate = {
            rate: rate,
            name: name
        }
        var sum = this.state.sum.asset - this.state.sum.liability;
        this.setState({
            exchangeRate: exchangeRate,
            assets: this.state.assets.map(entry => {
                entry['display_amount'] = this.formatAmount(entry.amount, exchangeRate);
                return entry;
            }),
            liabilities: this.state.liabilities.map(entry => {
                entry['display_amount'] = this.formatAmount(entry.amount, exchangeRate);
                return entry;
            }),
            sum: {
                asset: this.state.sum.asset,
                liability: this.state.sum.liability,
                formatted: this.formatAmount(sum, exchangeRate)
            }
        });
    }

    updateSum = (sum, is_asset) => {
        const key = is_asset ? 'asset': 'liability';
        const stateSum = this.state.sum;
        stateSum[key] = sum;
        stateSum.formatted = this.formatAmount(stateSum.asset - stateSum.liability, 
            this.state.exchangeRate);
        this.setState({sum: stateSum});
    }
    
    getEntries = () => {
        // mnaylor TODO handle error case
        axios.get(entries_url)
        .then(res => {
          const data = res.data.map(entry => {
              entry['display_amount'] = this.formatAmount(entry.amount, this.state.exchangeRate);
              return entry;
          });
          const assets = data.filter(entry => entry['is_asset']);
          const liabilities = data.filter(entry => !entry['is_asset']);

          const sumAssets = this.sumEntries(assets);
          const sumLiabilities = this.sumEntries(liabilities);

          this.setState({
              'assets': assets, 
              'liabilities': liabilities,
              'sum': {
                  'asset': sumAssets,
                  'liability': sumLiabilities,
                  'formatted': this.formatAmount(sumAssets - sumLiabilities, 
                                                 this.state.exchangeRate)
              }
            });
        })
        .catch(error => {
            console.log(error);
            this.state.setError('Failed to fetch entries.');
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
            <ErrorMessage message={this.state.error} clearError={this.clearError}></ErrorMessage>
            <Grid container>
                <Grid container spacing={10} style={{padding: 20}}>
                    <Grid item xs>
                        <Typography variant="h6">
                            Net Worth: {this.state.sum.formatted}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                    <CurrencyConverter updateCurrency={this.updateCurrency}></CurrencyConverter>
                    </Grid>
                </Grid>
                <Grid container spacing={10} style={{padding: 24}}>
                    <Grid item xs>
                        <Table entries={this.state.assets} is_asset={true} 
                                updateSum={this.updateSum} setError={this.setError}
                                exchange_rate={this.state.exchangeRate} />
                    </Grid>
                    <Grid item xs>
                        <Table entries={this.state.liabilities} is_asset={false} 
                                updateSum={this.updateSum} setError={this.setError}
                                exchange_rate={this.state.exchangeRate} />
                    </Grid>
                </Grid>
            </Grid>
            </div>
        )
    }
}

export default TableList;