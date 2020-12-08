import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/updateObject';

const initialState = {
    employeeId: null,
    employeeName: null,
    employeeType: null,
    token: null,
    error: null,
    loading: false,
    successMessage: null
};

const loginStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const loginSuccess = (state, action) => {
    return updateObject(state, {
        token: action.employeeDetails.token,
        employeeId: action.employeeDetails.employeeId,
        employeeName: action.employeeDetails.employeeName,
        employeeType: action.employeeDetails.employeeType,
        error: null,
        loading: false
    });
};

const loginFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false 
    });
};

const userLogout = (state, action) => {
    return updateObject(state, { token: null, employeeId: null });
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START: return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_FAIL: return loginFail(state, action);
        case actionTypes.AUTH_LOGOUT: return userLogout(state, action);
        default:
            return state;
    }
};

export default authReducer;