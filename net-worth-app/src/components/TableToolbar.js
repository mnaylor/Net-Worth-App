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
            data: defaultData,
            sum: 0,
            isValid: {
                amount: true,
                category: true,
                name: true
            }
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
        var isValid = this.isValidInput(data);
        this.setState({
            data: data,
            isValid: isValid
        });
      }

    isValidInput = (data) => {
        const maxCharLength = 50;
        const readyForPost = data.amount >= 0 && data.amount < Number.MAX_VALUE &&
                data.name.length > 0 && data.name.length < maxCharLength &&
                data.category.length > 0 && data.category.length < maxCharLength;
        return {
            amount: data.amount >= 0 && data.amount < Number.MAX_VALUE,
            name: data.name.length >= 0 && data.name.length <= maxCharLength,
            category: data.category.length >= 0 && data.category.length <= maxCharLength,
            readyForPost: readyForPost
        }
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

                <Dialog open={this.state.open} onClose={this.handleClose} 
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New {this.props.is_asset ? 'Asset': 'Liability'} Entry</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" name="category"
                                   type="string" value={this.state.category}
                                   onChange={this.handleInputChange}
                                   label={this.state.isValid.category ? "Category": "Less than 50 characters"}
                                   InputProps={{ error: !this.state.isValid.category }}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField margin="dense" name="name"
                                   type="string" value={this.state.name}
                                   onChange={this.handleInputChange}
                                   label={this.state.isValid.name ? "Name": "Less than 50 characters"}
                                   InputProps={{ error: !this.state.isValid.name }}
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField margin="dense" name="amount" type="number"
                                   label={this.state.isValid.amount ? "Amount": "Greater than 0"}
                                   InputProps={{ inputProps: {min: 0, max: Number.MAX_SAFE_INTEGER}, error: !this.state.isValid.amount,
                                      startAdornment: <InputAdornment position="start">USD</InputAdornment>
                        }}
                        value={this.state.amount}
                        onChange={this.handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Tooltip title="Category, Name, and Amount must have a value" aria-label="add">
                            <span>
                                <Button onClick={this.handleInput} color="primary"
                                        disabled={!this.state.isValid.readyForPost}>
                                    Add Entry
                                </Button>
                            </span>
                        </Tooltip>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default TableToolbar;