import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getProjectNameAutocomplete } from '../../api/timesheet/add-timesheet';

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    let active = true;
    const projectNameAutocomplete = async enteredProjectName => {
        const data = await getProjectNameAutocomplete(enteredProjectName);
        const loadedProjectName = [];
        for (const key in data) {
            loadedProjectName.push({
                projectName: data[key].ProjectTitle_vc,
                projectCode: data[key].ProjectCode_vc
            });
        }
        if (active) {
            console.log(data);
            setOptions(loadedProjectName);
        }
        console.log(options);
    };

    const getValue = value => {
        console.log(`getValue:  ${value}`);
    }

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onBlur={event => {getValue(event.target.value)}}
            getOptionSelected={(option) => option.projectCode}
            getOptionLabel={(option) => option.projectName}
            options={options}
            // loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    variant="outlined"
                    onChange={event => { projectNameAutocomplete(event.target.value) }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
