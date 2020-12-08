import { useReducer, useCallback } from 'react';
import axios from '../axios-timesheet';

const initialState = {
    loading: false,
    error: null,
    timesheetData: null,
    identifier: null,
    lineNoInt: null
};

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                loading: true,
                error: null,
                timesheetData: null,
                identifier: action.identifier
            };
        case 'RESPONSE':
            return {
                ...curHttpState,
                loading: false,
                timesheetData: action.responseData,
                lineNoInt: action.lineNoInt
            };
        case 'ERROR':
            return { loading: false, error: action.errorMessage };
        default:
            throw new Error('Should not be reached!');
    }
};

const useTimesheetData = () => {

    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const sendRequest = useCallback((url, requestData, token, reqIdentifer, lineNo) => {
        dispatchHttp({ type: 'SEND', identifier: reqIdentifer });

        axios.post(url, requestData, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                dispatchHttp({
                    type: 'RESPONSE',
                    responseData: response.data,
                    lineNoInt: lineNo
                });
            })
            .catch(err => {
                console.log(err);
                dispatchHttp({
                    type: 'ERROR',
                    errorMessage: 'Something went wrong!'
                });
            });
    }, []);

    return {
        isLoading: httpState.loading,
        timesheetData: httpState.timesheetData,
        error: httpState.error,
        sendRequest: sendRequest,
        reqIdentifer: httpState.identifier,
        lineNoInt: httpState.lineNoInt
    };

}


export default useTimesheetData;