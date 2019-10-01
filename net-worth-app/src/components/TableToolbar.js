import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
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
                            {this.props.is_asset ? 'Assets': 'Liabilities'}
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
                             is_asset={this.props.is_asset}
                             title={'New ' + (this.props.is_asset ? 'Asset': 'Liability')}
                />
            </div>
        )
    }
}

export default TableToolbar;