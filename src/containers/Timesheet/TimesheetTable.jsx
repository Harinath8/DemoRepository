import React, { Fragment, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography, makeStyles, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const TimesheetTable = React.memo((props) => {

    const { className, timesheetData, openHandler, editTimesheet, onDeleteTimesheet, ...rest } = props;
    const classes = useStyles();

    var indexInitial = 1;

    return (
        <Fragment>
            <Box display="flex" justifyContent="flex-end">
                <Button color="primary" variant="contained" onClick={openHandler}>Add Timesheet</Button>
            </Box>
            <Card className={clsx(classes.root, className)} {...rest}>
                <PerfectScrollbar>
                    <Box minWidth={1050}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>TS Date</TableCell>
                                    <TableCell> Project Code</TableCell>
                                    <TableCell>Project Name</TableCell>
                                    <TableCell>Cost Code Group</TableCell>
                                    <TableCell>CostCode Desc</TableCell>
                                    <TableCell>Reg.Hrs</TableCell>
                                    <TableCell>OT.Hrs</TableCell>
                                    <TableCell> Job Naration</TableCell>
                                    <TableCell> Submit To</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {timesheetData.map((timesheet, index) => (
                                    <TableRow hover key={index}>
                                        <TableCell>
                                            {indexInitial + index}
                                        </TableCell>
                                        <TableCell>
                                            {/* {moment(timesheet.TSDate_dt).format('DD/MM/YYYY')} */}
                                            {timesheet.TSDate_dt}
                                        </TableCell>
                                        <TableCell>
                                            {timesheet.ProjectCode_vc}
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                alignItems="center"
                                                display="flex"
                                            >
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {timesheet.ProjectTitle_vc}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                alignItems="center"
                                                display="flex"
                                            >
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {timesheet.GHTitle_vc}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                alignItems="center"
                                                display="flex"
                                            >
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {timesheet.CCDescp_vc}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{timesheet.TSRhours_nu}</TableCell>
                                        <TableCell>{timesheet.TSOhours_nu}</TableCell>
                                        <TableCell>{timesheet.JobDescp_vc}</TableCell>
                                        <TableCell>{timesheet.SubmitTo}</TableCell>
                                        <TableCell>
                                            <Box
                                                alignItems="center"
                                                display="flex"
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    onClick={() => { editTimesheet(timesheet) }}
                                                    startIcon={<EditIcon />}
                                                >
                                                    Edit
                                        </Button>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => { onDeleteTimesheet(timesheet) }}
                                            >
                                                Delete
                                        </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
            </Card>
        </Fragment>
    );
});

TimesheetTable.propTypes = {
    className: PropTypes.string,
    timesheetData: PropTypes.array.isRequired
};

export default TimesheetTable;
