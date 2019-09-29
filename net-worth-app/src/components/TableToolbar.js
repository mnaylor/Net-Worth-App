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

const defaultData =
    {
        name: '',
        category: '',
        amount: 0
    }

class TableToolbar extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            data: defaultData
          };
    }

    handleClickOpen = () => {
        this.setState({open: true});
      }

    handleClose = () => {
        this.setState({open: false, data: defaultData});
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        var data = this.state.data;
        data[name] = value;
        this.setState({
            data: data
        });
      }

    handleInput = () => {
        this.props.postEntry(this.state.data);
        this.handleClose();
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
                            Total = {this.props.sum}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <IconButton aria-label="add"
                            onClick={this.handleClickOpen}>
                                <AddBoxIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Dialog open={this.state.open} onClose={this.handleClose} 
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New {this.props.title} Entry</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" name="category" label="Category" 
                                   type="string" value={this.state.category}
                                   onChange={this.handleInputChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField margin="dense" name="name" label="Name" 
                                   type="string" value={this.state.name}
                                   onChange={this.handleInputChange}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField margin="dense" name="amount" label="Amount" type="number"
                        InputProps={{ inputProps: { min: 0, max: Number.MAX_SAFE_INTEGER } }}
                        value={this.state.amount}
                        onChange={this.handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleInput} color="primary">
                        Add Entry
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TableToolbar;