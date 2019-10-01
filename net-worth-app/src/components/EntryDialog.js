import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core/';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';

const defaultData =
    {
        name: '',
        category: '',
        amount: 0
    }

class EntryDialog extends Component {

    constructor() {
        super();
        this.state = {
            data: defaultData,
            isValid: {
                amount: true,
                category: true,
                name: true
            }
        }
    }

    isValidInput = (data) => {
        const maxCharLength = 50;
        const readyForPost = parseFloat(data.amount) &&
                data.amount >= 0 && data.amount < Number.MAX_VALUE &&
                data.name.length > 0 && data.name.length < maxCharLength &&
                data.category.length > 0 && data.category.length < maxCharLength;
        return {
            amount: parseFloat(data.amount) && data.amount >= 0 && data.amount < Number.MAX_VALUE,
            name: data.name.length >= 0 && data.name.length <= maxCharLength,
            category: data.category.length >= 0 && data.category.length <= maxCharLength,
            readyForPost: readyForPost
        }
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

    submit = () => {
        this.props.handleInput(this.state.data);
        this.props.closeDialog();
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
          this.setState({data: this.props.data});
        }
    }

    render() {
        return (
            <Dialog open={this.props.open}
                    onClose={this.props.closeDialog} >
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" name="category"
                        type="string" value={this.props.data ? this.props.data.category : this.state.data.category}
                        onChange={this.handleInputChange}
                        label={this.state.isValid.category ? "Category": "Less than 50 characters"}
                        InputProps={{ error: !this.state.isValid.category }}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField margin="dense" name="name"
                        type="string" value={this.props.data ? this.props.data.name : this.state.data.name}
                        onChange={this.handleInputChange}
                        label={this.state.isValid.name ? "Name": "Less than 50 characters"}
                        InputProps={{ error: !this.state.isValid.name }}
                    />
                </DialogContent>
                <DialogContent>
                    <TextField margin="dense" name="amount" type="number"
                        label={this.state.isValid.amount ? "Amount": "Greater than 0"}
                        InputProps={{ inputProps: {min: 0, max: Number.MAX_VALUE}, error: !this.state.isValid.amount,
                            startAdornment: <InputAdornment position="start">USD$</InputAdornment>}}
                        value={this.props.data ? this.props.data.amount : this.state.data.amount}
                        onChange={this.handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeDialog} color="primary">
                        Cancel
                    </Button>
                    <Tooltip title="Category, Name, and Amount must have a value" aria-label="add">
                        <span>
                            <Button onClick={this.submit} color="primary"
                                    disabled={!this.state.isValid.readyForPost}>
                                Submit
                            </Button>
                        </span>
                    </Tooltip>
                </DialogActions>
            </Dialog>
        )
    }
}

export default EntryDialog;