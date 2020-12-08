import React, { useState, useReducer, useEffect, Fragment, useCallback } from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import axios from '../../axios-timesheet'
import TimesheetTable from './TimesheetTable';

import useTimesheetData from '../../custom-hooks/timesheet-data';
import AddTimesheet from './AddTimesheet';

import { getProjectName, getProjectNameAutocomplete, getCostCenterGroup, getCostCodeDescId } from '../../api/timesheet/add-timesheet';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const timesheetReducer = (currentTimesheetData, action) => {
    switch (action.type) {
        case 'SET':
            console.log(action.timesheetData);
            return action.timesheetData;
        case 'ADD':
            return [...currentTimesheetData, action.timesheetData];
        case 'EDIT':
            return [...currentTimesheetData];
        case 'DELETE':
            return currentTimesheetData.filter(timesheet => timesheet.LineNo_Int !== action.id);
        default:
            throw new Error('Should not get there!');
    }
};

const initialimesheetData = {
    employeeId: "",
    TSDate: "",
    ProjectCode: "",
    CostCodeDescId: "",
    CostCodeGroupId: "",
    RegHrs: "",
    OTHrs: "",
    JobNaration: "",
    SubmitToId: "",
    LineId: ""
};

const Timesheet = ({ employeeId, token }) => {
    const classes = useStyles();

    const [employeeTimesheet, dispatch] = useReducer(timesheetReducer, []);
    const { timesheetData, isLoading, error, sendRequest, reqIdentifer, lineNoInt } = useTimesheetData();

    const [showAddTimesheet, setShowAddTimesheet] = useState(false);
    const [editTimesheetData, setEditTimesheetData] = useState(initialimesheetData);

    const [costCenterGroup, setCostCenterGroup] = useState([]);
    const [submitTo, setSubmitTo] = useState([])
    const [lineNo, setLineNo] = useState(0);

    useEffect(() => {
        if (timesheetData) {
            employeeTimesheet.map((timesheet, index) => setLineNo(lineNo + index));
        }
    }, [timesheetData, employeeTimesheet, lineNo]);

    useEffect(() => {
        if (!isLoading && !error && reqIdentifer === 'DELETE_TIMESHEET') {
            dispatch({ type: 'DELETE', id: lineNoInt });
        } else if (!isLoading && !error && reqIdentifer === 'GET_TIMESHEET') {
            dispatch({
                type: 'SET',
                timesheetData: timesheetData
            })
        }
    }, [timesheetData, reqIdentifer, isLoading, error, lineNoInt]);

    useEffect(() => {
        sendRequest('/emp/employeeDisplay', { employeeId }, token, 'GET_TIMESHEET');
    }, [sendRequest,employeeId,token]);

    useEffect(() => {
        const costCenterGroup = async () => {
            const data = await getCostCenterGroup(employeeId, token);
            setCostCenterGroup(data.costcenter);
            setSubmitTo(data.submit);
        };
        costCenterGroup();
    }, [employeeId,token]);

    const getProjectNameByProjectCode = async projectCode => {
        const projectName = await getProjectName(projectCode, token);
        return projectName;
    };

    const projectNameAutocomplete = async enteredProjectName => {
        const projectNames = await getProjectNameAutocomplete(enteredProjectName, token);
        return projectNames;
    };

    const costCodeDescId = async enteredProjectName => {
        const costCodeDesc = await getCostCodeDescId(enteredProjectName, token);
        return costCodeDesc;
    };

    const addNewTimesheet = useCallback(timesheet => {
        console.log(timesheet);
        if(timesheet.LineId) {
            setLineNo(timesheet.LineId);
            // lineNo = timesheet.LineId;
        }
        sendRequest( 
            '/emp/saveEmployee',
            { object: { ...timesheet, LineId: lineNo, employeeId } },
            token,
            'ADD_TIMESHEET'
        );
    }, [sendRequest, lineNo, employeeId, token]);

    const editTimesheetHandler = editTimesheet => {
        console.log(editTimesheet);
        setShowAddTimesheet(true);
        setEditTimesheetData({
            ...editTimesheetData,
            employeeId: editTimesheet.EmpId_vc,
            TSDate: editTimesheet.TSDate_dt,
            ProjectCode: editTimesheet.ProjectCode_vc,
            CostCodeDescId: editTimesheet.CCode_vc,
            CostCodeGroupId: editTimesheet.GH_Int,
            RegHrs: editTimesheet.TSRhours_nu,
            OTHrs: editTimesheet.TSOhours_nu,
            JobNaration: editTimesheet.JobDescp_vc,
            SubmitToId: editTimesheet.SubmitTo_vc,
            LineId: editTimesheet.LineNo_Int,
        });
    }

    const deleteTimesheet = useCallback(timesheet => {
        console.log(timesheet);
        sendRequest(
            '/emp/deleteTsRecord',
            {
                lineNumber: timesheet.LineNo_Int,
                employeeId: timesheet.EmpId_vc,
                projectCode: timesheet.ProjectCode_vc
            },
            token,
            'DELETE_TIMESHEET',
            timesheet.LineNo_Int
        );
    }, [sendRequest,token]);

    const handleClickOpen = () => {
        setShowAddTimesheet(true);
    };
    const handleClose = () => {
        setShowAddTimesheet(false);
    };

    let addTimesheet = null;
    if (showAddTimesheet) {
        addTimesheet = <AddTimesheet
            open={showAddTimesheet}
            timesheetData={editTimesheetData}
            addNewTimesheet={addNewTimesheet}
            costCodeDescIDs={costCodeDescId}
            getProjectName={getProjectNameByProjectCode}
            projectAutocomplete={projectNameAutocomplete} 
            closeHandler={handleClose}
            costCodeGroup={costCenterGroup}
            submitTimesheetTo={submitTo}
        />
    }

    return (
        <Fragment>
            <Container maxWidth={false} className={classes.root}>
                <Box mt={3}>
                    <TimesheetTable
                        timesheetData={employeeTimesheet}
                        openHandler={handleClickOpen}
                        onDeleteTimesheet={deleteTimesheet}
                        editTimesheet={editTimesheetHandler} />
                </Box>
            </Container>
            {addTimesheet}
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        token: state.token,
        employeeId: state.employeeId
    };
};

export default connect(mapStateToProps)(withErrorHandler( Timesheet, axios ));
