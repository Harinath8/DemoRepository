import React, { useCallback, useEffect, useReducer, useState } from 'react';
import ApproveOrUnapproveSearch from './Search/ApproveOrUnapproveSearch';
import useApproveUnapprove from '../../custom-hooks/approve-unapprove'

import ApproveOrUnapproveTimesheetTable from './ApproveOrUnapproveTimesheetTable/ApproveOrUnapproveTimesheetTable'
import { getEmployeeName } from '../../api/ApproveOrUnapproveTimesheet/approve-unapprove-timesheet';
import { connect } from 'react-redux';

const approveUnapproveReducer = (currentTimesheetData, action) => {
    switch (action.type) {
        case 'SET':
            console.log(action.approveUnapprove);
            return action.approveUnapprove;
        case 'APPROVE_UNAPPROVE':
            return currentTimesheetData.filter((timesheet) =>
                action.id.indexOf(timesheet.LineNo_Int) !== -1);
        default:
            throw new Error('Should not get there!');
    }
};

const ApproveOrUnapproveTimesheet = ({ employeeId, token }) => {
    const [approveUnapproveData, dispatch] = useReducer(approveUnapproveReducer, []);
    const { aporunpTimesheetList, isLoading, error, sendRequest, reqIdentifer, lineNoInt } = useApproveUnapprove();

    const timesheetLineNos = approveUnapproveData.map((timesheet) => timesheet.LineNo_Int);
    const [selectedTimesheetIds, setSelectedTimesheetIds] = useState([]);

    useEffect(() => {
        if (approveUnapproveData) {
            setSelectedTimesheetIds(timesheetLineNos);
        }
    }, [approveUnapproveData, timesheetLineNos]);

    useEffect(() => {
        if (!isLoading && !error && reqIdentifer === 'APPROVE_UNAPPROVE_TIMESHEET') {
            dispatch({ type: 'APPROVE_UNAPPROVE', id: lineNoInt });
        } else if (!isLoading && !error && reqIdentifer === 'GET_APPROVEUNAPPROVE_DATA') {
            dispatch({
                type: 'SET',
                approveUnapprove: aporunpTimesheetList
            })
        }
    }, [aporunpTimesheetList, reqIdentifer, isLoading, error, lineNoInt]);


    const employeeNameAutocomplete = async (employeeName, searchDate) => {
        const data = await getEmployeeName({
            employeeName: employeeName,
            employeeId: employeeId,
            toDate: searchDate
        }, token);
        return data;
    };

    const handleSelectAll = (event) => {
        let newSelectedTimesheetIds;
        if (event.target.checked) {
            newSelectedTimesheetIds = timesheetLineNos;
        } else {
            newSelectedTimesheetIds = [];
        }
        setSelectedTimesheetIds(newSelectedTimesheetIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedTimesheetIds.indexOf(id);
        let newSelectedTimesheetIds = [];
        if (selectedIndex === -1) {
            newSelectedTimesheetIds = newSelectedTimesheetIds.concat(selectedTimesheetIds, id);
        } else if (selectedIndex === 0) {
            newSelectedTimesheetIds = newSelectedTimesheetIds.concat(selectedTimesheetIds.slice(1));
        } else if (selectedIndex === selectedTimesheetIds.length - 1) {
            newSelectedTimesheetIds = newSelectedTimesheetIds.concat(selectedTimesheetIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedTimesheetIds = newSelectedTimesheetIds.concat(
                selectedTimesheetIds.slice(0, selectedIndex),
                selectedTimesheetIds.slice(selectedIndex + 1)
            );
        }
        setSelectedTimesheetIds(newSelectedTimesheetIds);
    };

    const searchApproveUnapprove = useCallback(searchData => {
        sendRequest(
            '/approve/approveOrUnApproveSearch',
            {
                employeeId: employeeId,
                employeeCode: searchData.employeeCode,
                toDate: searchData.toDate
            },
            token,
            'GET_APPROVEUNAPPROVE_DATA'
        );
    }, [sendRequest, employeeId, token]);

    const approveTimesheet = () => {
        sendRequest(
            '/approve/approveTimeSheet',
            {
                employeeId: employeeId,
                object: approveUnapproveData.filter((timesheet) =>
                    selectedTimesheetIds.indexOf(timesheet.LineNo_Int) !== -1)
            },
            token,
            'APPROVE_UNAPPROVE_TIMESHEET',
            selectedTimesheetIds
        );
    };

    const unApproveTimesheet = () => {
        sendRequest(
            '/approve/unApproveTimeSheet',
            {
                employeeId: employeeId,
                object: approveUnapproveData.filter((timesheet) =>
                    selectedTimesheetIds.indexOf(timesheet.LineNo_Int) !== -1)
            },
            token,
            'APPROVE_UNAPPROVE_TIMESHEET',
            selectedTimesheetIds
        );
    };

    let approveUnapproveTable;
    if (aporunpTimesheetList) {
        approveUnapproveTable = <ApproveOrUnapproveTimesheetTable
            selectedTimesheets={selectedTimesheetIds}
            selectAll={handleSelectAll}
            selectOne={handleSelectOne}
            approveUnapproveList={approveUnapproveData} />
    }

    return (
        <div>
            <ApproveOrUnapproveSearch
                approve={approveTimesheet}
                unApprove={unApproveTimesheet}
                view={searchApproveUnapprove}
                getEmployeeName={employeeNameAutocomplete} />
            {approveUnapproveTable}
        </div>
    );
};


const mapStateToProps = state => {
    return {
        token: state.token,
        employeeId: state.employeeId
    };
};

export default connect(mapStateToProps)(ApproveOrUnapproveTimesheet);
