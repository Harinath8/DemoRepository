import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, makeStyles, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const TimesheetTable = React.memo((props) => {
  const classes = useStyles();
  const {
    timesheetData,
    openHandler,
    editTimesheet,
    onDeleteTimesheet,
  } = props;

  var indexInitial = 1;

  return (
    <Fragment>
      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" variant="contained" onClick={openHandler}>
          Add Timesheet
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">TS Date</TableCell>
              <TableCell align="center">Project Code</TableCell>
              <TableCell align="center">Project Name</TableCell>
              <TableCell align="center">Cost Code Group</TableCell>
              <TableCell align="center">CostCode Desc</TableCell>
              <TableCell align="center">Reg.Hrs</TableCell>
              <TableCell align="center">OT.Hrs</TableCell>
              <TableCell align="center">Job Naration</TableCell>
              <TableCell align="center">Submit To</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {timesheetData.map((timesheet, index) => (
              <TableRow hover key={index}>
                <TableCell>{indexInitial + index}</TableCell>
                <TableCell>
                  {/* {moment(timesheet.TSDate_dt).format('DD/MM/YYYY')} */}
                  {timesheet.TSDate_dt}
                </TableCell>
                <TableCell>{timesheet.ProjectCode_vc}</TableCell>
                <TableCell>{timesheet.ProjectTitle_vc}</TableCell>
                <TableCell>{timesheet.GHTitle_vc}</TableCell>
                <TableCell>{timesheet.CCDescp_vc}</TableCell>
                <TableCell>{timesheet.TSRhours_nu}</TableCell>
                <TableCell>{timesheet.TSOhours_nu}</TableCell>
                <TableCell>{timesheet.JobDescp_vc}</TableCell>
                <TableCell>{timesheet.SubmitTo}</TableCell>
                <TableCell>
                  <Box alignItems="center" display="flex">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => {
                        editTimesheet(timesheet);
                      }}
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
                    onClick={() => {
                      onDeleteTimesheet(timesheet);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
});

TimesheetTable.propTypes = {
  className: PropTypes.string,
  timesheetData: PropTypes.array.isRequired,
};

export default TimesheetTable;
