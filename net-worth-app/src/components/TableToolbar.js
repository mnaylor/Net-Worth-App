import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

class TableToolbar extends Component {
    constructor() {
        super();
        this.state = {
            open: false
          }
    }

    handleClickOpen = () => {
        this.setState({open: true});
      }

    handleClose = () => {
        this.setState({open: false});
    }

    render() {
        return (
            <div>
                <Grid container spacing={10} style={{padding: 24}}>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <Typography variant="h6" color="inherit">
                            {this.props.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <IconButton aria-label="add"
                        onClick={this.handleClickOpen}>
                            <AddBoxIcon />
                        </IconButton>
                    </Grid>
                </Grid>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">New {this.props.title} Entry</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="name" label="Name" type="string"
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="category" label="Category" type="string"
                        />
                    </DialogContent>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="amount" label="Amount" type="number"
                        InputProps={{ inputProps: { min: 0, max: Number.MAX_SAFE_INTEGER } }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                        Add Entry
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

export default TableToolbar;