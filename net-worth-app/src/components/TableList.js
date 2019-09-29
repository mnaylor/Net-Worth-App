import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Table from '../components/Table';

const entries_url = 'http://localhost:5000/entries';

class TableList extends Component {
    constructor() {
        super()
        this.state = {
            assets: [],
            liabilities: []
        }
        this.getEntries()
    }
    
    getEntries = () => {
        // mnaylor TODO handle error case
        axios.get(entries_url)
        .then(res => {
          const assets = res.data.filter(entry => entry['is_asset']);
          const liabilities = res.data.filter(entry => !entry['is_asset']);

          this.setState({'assets': assets, 'liabilities': liabilities});
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Grid container spacing={10} style={{padding: 24}}>
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Table entries={this.state.assets} is_asset={true} />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4} xl={3}>
                            <Table entries={this.state.liabilities} is_asset={false} />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default TableList;