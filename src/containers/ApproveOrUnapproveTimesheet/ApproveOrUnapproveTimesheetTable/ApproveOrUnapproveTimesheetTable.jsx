import React, { memo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Checkbox
} from '@material-ui/core';
import moment from 'moment';

const ApproveOrUnapproveTimesheetTable = memo(props => {
    const { approveUnapproveList, selectedTimesheets, selectAll, selectOne } = props;
    let indexInitial = 1;
    return (
        <Card>
            <PerfectScrollbar>
                <Box minWidth={1050}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>TS Date</TableCell>
                                <TableCell>Project Name</TableCell>
                                <TableCell>Cost Code Group</TableCell>
                                <TableCell>Submitted By</TableCell>
                                <TableCell>Approved By</TableCell>
                                <TableCell>Submitted To</TableCell>
                                <TableCell>HOD Approval</TableCell>
                                <TableCell>Accounts</TableCell>
                                <TableCell>Reg.Hrs</TableCell>
                                <TableCell>OT.Hrs</TableCell>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedTimesheets.length === approveUnapproveList.length}
                                        color="primary"
                                        indeterminate={
                                            selectedTimesheets.length > 0
                                            && selectedTimesheets.length < approveUnapproveList.length
                                        }
                                        onChange={selectAll}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {approveUnapproveList.map((data, index) => (
                                <TableRow
                                    hover
                                    key={index}
                                    selected={selectedTimesheets.indexOf(data.LineNo_Int) !== -1}>
                                    <TableCell>
                                        {indexInitial + index}
                                    </TableCell>
                                    <TableCell>
                                        {moment(data.TSDate_dt).format('DD/MM/YYYY')}
                                        {/* {data.TSDate_dt} */}
                                    </TableCell>
                                    <TableCell>
                                        {data.ProjectTitle_vc}
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
                                                {data.GHTitle_vc}
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
                                                {data.SubmittedBy}
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
                                                {data.ApprovedBy_vc}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{data.SubmittedTo}</TableCell>
                                    <TableCell>{data.AccountsApproval}</TableCell>
                                    <TableCell>{data.AccountsApproval}</TableCell>
                                    <TableCell>{data.TSRhours_nu}</TableCell>
                                    <TableCell>{data.TSOhours_nu}</TableCell>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedTimesheets.indexOf(data.LineNo_Int) !== -1}
                                            onChange={(event) => selectOne(event, data.LineNo_Int)}
                                            value="true"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
        </Card>

    )
})

export default ApproveOrUnapproveTimesheetTable
