import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

class TableToolbar extends Component {
    constructor() {
        super();
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
                        onClick={(event) => this.props.action.onClick(event, this.props.data)}>
                            <AddBoxIcon />
                        </IconButton>
                    </Grid>
                </Grid>


            </div>
        )
    }
}

export default TableToolbar;