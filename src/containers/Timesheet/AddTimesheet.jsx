import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import moment from "moment";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function AddTimesheet(props) {
  const {
    addNewTimesheet,
    costCodeGroup,
    submitTimesheetTo,
    closeHandler,
    open,
    timesheetData,
    costCodeDescIDs,
    getProjectName,
    projectAutocomplete,
  } = props;
  const classes = useStyles();

  // const [addTimesheet, setAddTimesheet] = useState(initialState);

  const [addTimesheet, setAddTimesheet] = useState(timesheetData);
  console.log(addTimesheet);

  const [ProjectName, setProjectName] = useState("");
  const [costCodeDesc, setCostCodeDesc] = useState([]);

  const getProjectNameByProjectCode = async (projectCode) => {
    const projectName = await getProjectName(projectCode);
    setProjectName(projectName);
  };

  const getCostCodeGroupId = async (event) => {
    setAddTimesheet({ ...addTimesheet, CostCodeDescId: event.target.value });
    const costCodeDescList = await costCodeDescIDs(event.target.value);
    setCostCodeDesc(costCodeDescList);
  };

  const [openAutocomplete, setAutocompleteOpen] = useState(false);
  const [options, setOptions] = useState([]);

  let active = true;
  const projectNameAutocomplete = async (enteredProjectName) => {
    const data = await projectAutocomplete(enteredProjectName);
    const loadedProjectName = [];
    for (const key in data) {
      loadedProjectName.push({
        projectName: data[key].ProjectTitle_vc,
        projectCode: data[key].ProjectCode_vc,
      });
    }
    if (active) {
      setOptions(loadedProjectName);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    addNewTimesheet(addTimesheet);
  };

  return (
    <div>
      <Dialog
        onClose={closeHandler}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={closeHandler}>
          Add Timesheet
        </DialogTitle>
        <DialogContent dividers>
          <form
            className={classes.root}
            onSubmit={submitHandler}
            noValidate
            autoComplete="off"
          >
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  label="TS Date"
                  name="TSDate"
                  type="date"
                  variant="outlined"
                  size="small"
                  //value={timesheetData.TSDate}
                  defaultValue={moment(addTimesheet.TSDate).format(
                    "DD/MM/YYYY"
                  )}
                  // onChange={event => { handleChange(event) }}
                  onChange={(event) => {
                    setAddTimesheet({
                      ...addTimesheet,
                      TSDate: moment(event.target.value).format("DD/MM/YYYY"),
                    });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Code"
                  id="outlined-size-small"
                  name="ProjectCode"
                  variant="outlined"
                  type="number"
                  size="small"
                  value={addTimesheet.ProjectCode}
                  // value={addTimesheet.ProjectCode}
                  // onChange={event => { setAddTimesheet({ ...addTimesheet, ProjectCode: event.target.value }) }}
                  onBlur={(event) => {
                    getProjectNameByProjectCode(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth={false}
                  style={{ width: 200 }}
                  open={openAutocomplete}
                  onOpen={() => {
                    setAutocompleteOpen(true);
                  }}
                  onClose={() => {
                    setAutocompleteOpen(false);
                  }}
                  defaultValue={ProjectName ? ProjectName : null}
                  // onBlur={event => { getValue(event.target.value) }}
                  // getOptionSelected={(option, value) => option.projectCode === value.projectCode }
                  // getOptionSelected={(option) => getValue(option.projectCode)}
                  // loading={loading}
                  getOptionLabel={(option) => option.projectName}
                  // onChange={(event, value) => { getValue(event, value) }}
                  onChange={(event, value) => {
                    setAddTimesheet({
                      ...addTimesheet,
                      ProjectCode: value.projectCode,
                    });
                  }}
                  options={options}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Project Name"
                      id="outlined-size-small"
                      variant="outlined"
                      size="small"
                      onChange={(event) => {
                        projectNameAutocomplete(event.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  style={{ width: 200 }}
                  size="small"
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel>Cost Code Group</InputLabel>
                  <Select
                    native
                    defaultValue={timesheetData.CostCodeGroupId}
                    onChange={(event) => {
                      getCostCodeGroupId(event);
                    }}
                    label="Cost Code Group"
                    inputProps={{
                      name: "CostCodeGroup",
                    }}
                  >
                    {/* <option value="0">{timesheetData}</option> */}
                    {costCodeGroup.map((costCode) => (
                      <option key={costCode.GH_Int} value={costCode.GH_Int}>
                        {costCode.GHTitle_vc}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  style={{ width: 200 }}
                  size="small"
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="costCodeDesc">Cost Code Desc</InputLabel>
                  <Select
                    native
                    defaultValue={timesheetData.CostCodeDescId}
                    onChange={(event) => {
                      setAddTimesheet({
                        ...addTimesheet,
                        CostCodeGroupId: event.target.value,
                      });
                    }}
                    // onChange={event => { getCostcostCodeGroupId(event)}}
                    label="Cost Code Desc"
                    inputProps={{
                      name: "CostCodeDesc",
                      id: "costCodeDesc",
                    }}
                  >
                    {/* <option value="Submit To">Submit To</option> */}
                    {/* <option aria-label="None" value="" /> */}
                    {costCodeDesc.map((costCode, i) => (
                      <option key={i} value={costCode.CCode_vc}>
                        {costCode.CCDescp_vc}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Reg Hrs"
                  id="outlined-size-small"
                  defaultValue={timesheetData.RegHrs}
                  variant="outlined"
                  size="small"
                  onChange={(event) => {
                    setAddTimesheet({
                      ...addTimesheet,
                      RegHrs: event.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="OT Hrs"
                  id="outlined-size-small"
                  defaultValue={timesheetData.OTHrs}
                  variant="outlined"
                  size="small"
                  onChange={(event) => {
                    setAddTimesheet({
                      ...addTimesheet,
                      OTHrs: event.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Job Naration"
                  id="outlined-size-small"
                  defaultValue={timesheetData.JobNaration}
                  variant="outlined"
                  size="small"
                  onChange={(event) => {
                    setAddTimesheet({
                      ...addTimesheet,
                      JobNaration: event.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Submit To"
                  name="state"
                  onChange={(event) => {
                    setAddTimesheet({
                      ...addTimesheet,
                      SubmitToId: event.target.value,
                    });
                  }}
                  required
                  select
                  SelectProps={{ native: true }}
                  // value={values.state}
                  defaultValue={timesheetData.SubmitToId}
                  variant="outlined"
                >
                  <option value="" disabled>
                    {" "}
                    Submit To{" "}
                  </option>
                  {submitTimesheetTo.map((submitTo) => (
                    <option key={submitTo.EmpId_vc} value={submitTo.EmpId_vc}>
                      {submitTo.EmpName_vc}
                    </option>
                  ))}
                </TextField>
                {/* <FormControl size="small" variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Submit To</InputLabel>
                <Select
                    native
                    defaultValue={timesheetData.SubmitToId}
                    onChange={event => { setAddTimesheet({ ...addTimesheet, SubmitToId: event.target.value }) }}
                    label="Submit To"
                    inputProps={{
                        name: 'submitTo',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option value="" disabled> Submit To </option>
                    {submitTimesheetTo.map((submitTo) =>
                        <option key={submitTo.EmpId_vc} value={submitTo.EmpId_vc}>{submitTo.EmpName_vc}
                        </option>
                    )}
                </Select>
                </FormControl> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // disabled=""
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
