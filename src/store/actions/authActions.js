import axios from '../../axios-timesheet';
import * as actionTypes from './actionTypes';

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (employeeDetails) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        employeeDetails: employeeDetails
    };
};

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error
    };
};

export const login = (employeeName, password) => {
    return dispatch => {
        dispatch(loginStart());
        const authData = {
            employeeName,
            password
        };
        const url = 'http://192.168.0.173:8028/login';

        axios.post(url, authData)
            .then(response => {
                console.log(response.data);
                if (response.data.status === 200) {
                    localStorage.setItem('employee', JSON.stringify(response.data.result));
                    // localStorage.setItem('token', response.data.result.token);
                    // localStorage.setItem('employeeId', response.data.result.employeeId);
                    dispatch(loginSuccess(response.data.result));
                } else if (response.data.status === 400 || 401) {
                    dispatch(loginFail("Invalid Employee Name & Password"));
                    // dispatch(loginFail(response.data.message));
                } else {
                    dispatch(loginFail(response.data.message));
                }
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    if (error.response.status === 401) {
                        dispatch(loginFail("Invalid Employee Name & Password"));
                    }
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        // .catch(err => {
        //     console.log(err.response);
        //     dispatch(loginFail(err.response.data.error));
        // });
    };
};


export const userLogout = () => {
    localStorage.removeItem('employee');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const authCheckState = () => {
    return dispatch => {
        // const employee = localStorage.getItem('employee');
        const employee = JSON.parse(localStorage.getItem('employee'))
        if (!employee) {
            dispatch(userLogout());
        } else {
            dispatch(loginSuccess(employee));
        }

    };
};