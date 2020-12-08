import axios from '../../axios-timesheet'

export const getEmployeeName = async (requestData, token) => {
    try {
        const { data } = await axios.post(
            '/approve/getEmployee',
            requestData,
            { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        return error;
    }
};