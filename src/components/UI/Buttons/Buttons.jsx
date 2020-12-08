import { Box, Button, makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    importButton: {
        marginRight: theme.spacing(1)
    }
}));

const Buttons = props => {
    const classes = useStyles();

    return (
        <Box display="flex" justifyContent="flex-end" p={0.4}>
            <Button color="primary" variant="contained" className={classes.importButton}>
                Search
            </Button>
            <Button color="primary" variant="contained" className={classes.importButton}>
                Approve
            </Button>
            <Button color="primary" variant="contained" className={classes.importButton}>
                UnApprove
            </Button>
            <Button color="primary" variant="contained" className={classes.importButton}
                onClick={props.view}>
                View
            </Button>
            <Button color="primary" variant="contained">Close</Button>
        </Box>
    )
};

export default Buttons;
