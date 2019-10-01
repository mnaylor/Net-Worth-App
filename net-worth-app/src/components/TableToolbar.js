import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EntryDialog from '../components/EntryDialog';

class TableToolbar extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            sum: 0,
          };
        this.closeDialog = this.closeDialog.bind(this);
    }

    handleClickOpen = () => {
        this.setState({open: true});
      }

    closeDialog = () => {
        this.setState({open: false});
    }

    render() {
        return (
            <div>
                <Grid container spacing={5} style={{padding: 5}} justify="flex-start">
                    <Grid item xs>
                        <Typography variant="h6" color="inherit">
                            {this.props.isAsset ? 'Assets': 'Liabilities'}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h6" color="inherit">
                            {this.props.sum}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <IconButton aria-label="add"
                            onClick={this.handleClickOpen}>
                                <AddBoxIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <EntryDialog open={this.state.open}
                             handleInput={this.props.postEntry}
                             closeDialog={this.closeDialog}
                             isAsset={this.props.isAsset}
                             title={'New ' + (this.props.isAsset ? 'Asset': 'Liability')}
                />
            </div>
        )
    }
}

export default TableToolbar;