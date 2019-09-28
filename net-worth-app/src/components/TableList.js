import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Table from '../components/Table'

class TableList extends Component {    
    constructor() {
        super()
        this.state = {
            assets: [{
                name: "Some asset",
                category: "Savings",
                is_asset: true,
                amount: 1,
                id: 0
            }],
            liabilities: [{
                name: "Some liability",
                category: "mortgage",
                is_asset: false,
                amount: 1,
                id: 1
            }],
            searchString: ''
        }
        this.getEntries()
    }
    
    getEntries = () => {
        console.log(this.state)
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