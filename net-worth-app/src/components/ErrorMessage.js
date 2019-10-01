import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Paper, IconButton } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

function ErrorMessage(props) {
    const message = props.message;
    if (message) {
        return (
            <Grid container spacing={10} style={{padding: 20}} justify="center">
                <Grid item xs={6}>
                    <Paper style={{padding: 10}}>
                        <Grid container justify="center">
                            <Grid item xs={11}>
                                <Typography id="errorMessage" component="p">
                                    {props.message}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography>
                                    <IconButton aria-label="close" size="small" onClick={props.clearError}>
                                        <Close fontSize="inherit" />
                                    </IconButton>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
    return <div />;
  }

export default ErrorMessage;