import React from 'react';
import { CardContent, CardHeader, Divider, Paper } from '@material-ui/core';

function Card(props) {

    return (
        <Paper elevation={8} >
            <CardHeader subheader={props.title} />
            <Divider />
            <CardContent>
                {props.children}
            </CardContent>
        </Paper>
    )
}


export default Card

