import { Box, Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { memo, useState } from 'react';
import Card from '../../../components/UI/Card/Card'
import styles from './ApproveOrUnapproveSearch.module.css'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from 'moment';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '28ch',
        },
    },
    textField: {
        marginLeft: theme.spacing(6)
    },
    buttonMargin: {
        marginRight: theme.spacing(1)
    }
}));

const ApproveOrUnapproveSearch = memo(props => {
    const { view, getEmployeeName, approve, unApprove } = props;
    const classes = useStyles();

    const [employee, setEmployee] = useState({
        value: '',
        error: false
    });
    const [selectedDate, handleDateChange] = useState({
        value: null,
        error: false,
        validationMsg: ''
    });

    const [options, setOptions] = useState([]);

    let active = true;
    const EmployeeNameAutocomplete = async enteredEmloyeeName => {
        setEmployee({ ...employee, value: enteredEmloyeeName, error: false, validationMsg: '' })

        let searchDate;
        if (selectedDate.value) {
            searchDate = moment(selectedDate.value).format('MM/YYYY');
        } else if (selectedDate.value == null) {
            searchDate = "";
        }

        const data = await getEmployeeName(enteredEmloyeeName, searchDate);
        const loadedEmployeeName = [];
        for (const key in data) {
            loadedEmployeeName.push({
                employeeId: data[key].EmpId_vc,
                employeeName: data[key].EmpName_vc
            });
        }
        if (active) {
            setOptions(loadedEmployeeName);
        }
    };

    const getValue = value => {
        if (!value) {
            setEmployee({ ...employee, error: true });
        } else if (value) {
            setEmployee({ ...employee, value: value, error: false });
        }
        console.log(`getValue:  ${value}`);
    }

    const searchValidation = () => {
        if (!employee.value) {
            setEmployee({ ...employee, error: true });
        } else if (!selectedDate.value) {
            handleDateChange({ ...selectedDate, validationMsg: "Date Required!", error: true })
        }

        if (employee.value && selectedDate.value) {
            // const searchDate = moment(selectedDate.value, "MM/YYYY");
            // view({ employeeCode: "AR-A026", toDate: searchDate });
            view({ employeeCode: "AR-A026", toDate: moment(selectedDate.value).format('MM/YYYY') })
        }
    }

    return (
        <section className={clsx(styles.search)}>
            <Card title="Approve / UnApprove TimeSheets">
                <form
                    autoComplete="off"
                    noValidate
                >
                    <Grid container spacing={1}>
                        <Grid item md={4} xs={6} sm={6}>
                            <Typography variant="h6">Employee</Typography>
                        </Grid>
                        <Grid item md={6} xs={12} sm={6}>
                            <Autocomplete
                                freeSolo
                                fullWidth={false}
                                style={{ width: 220 }}
                                disableClearable
                                // onBlur={event => { getValue(event.target.value) }}
                                // options={options.map((option) => option.employeeName)}
                                getOptionSelected={(option) => option.employeeId}
                                getOptionLabel={(option) => option.employeeName}
                                options={options}

                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        InputProps={{ ...params.InputProps, type: 'search' }}
                                        label="Employee"
                                        name="employee"
                                        margin="dense"
                                        onChange={event => { EmployeeNameAutocomplete(event.target.value) }}
                                        required
                                        onBlur={event => { getValue(event.target.value) }}
                                        variant="outlined"
                                        error={employee.error}
                                        helperText={employee.error ? "Employee Required!" : null}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item md={4} xs={12} sm={6}>
                            <Typography variant="h6">Date</Typography>
                        </Grid>
                        <Grid item md={8} xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    autoOk
                                    required
                                    margin="dense"
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Date"
                                    name="date"
                                    style={{ width: 220 }}
                                    // format="MM/yyyy"
                                    openTo="year"
                                    views={["year", "month"]}
                                    value={selectedDate.value ? moment(new Date(selectedDate.value)) : null}
                                    InputAdornmentProps={{ position: "end" }}
                                    maxDate={new Date()}
                                    error={selectedDate.error}
                                    helperText={selectedDate.validationMsg}
                                    onChange={(event, date) => { handleDateChange({ ...selectedDate, value: date, error: false, validationMsg: '' }) }}
                                // onChange={(event, date) => handleChange(event, date)}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </form>
            </Card>
            <Box display="flex" justifyContent="flex-end" p={0.4}>
                <Button onClick={searchValidation} type="submit" color="primary" variant="contained" className={classes.buttonMargin}>
                    Search
                </Button>
                <Button color="primary" variant="contained" className={classes.buttonMargin}
                    onClick={approve}>
                    Approve
                </Button>
                <Button color="primary" variant="contained" className={classes.buttonMargin}
                    onClick={unApprove}>
                    UnApprove
                </Button>
                <Button color="primary" variant="contained" className={classes.buttonMargin}
                    onClick={() => { view({ employeeCode: "", toDate: "" }) }}>
                    View
                </Button>
                <Button color="primary" variant="contained">Close</Button>
            </Box>
        </section>
    )
});

export default ApproveOrUnapproveSearch;

