import axios from '../../axios-timesheet'

export const getProjectName = async (requestData, token) => {
    try {
        const { data } = await axios.post(
            '/reusable/getProjectNameByProjectCode',
            { projectCode: requestData },
            { headers: { Authorization: `Bearer ${token}` } });
        return data.projectName;
    } catch (error) {
        return error;
    }
};

export const getProjectNameAutocomplete = async (requestData, token) => {
    try {
        const { data } = await axios.get(
            `/reusable/getProjectName?projectName=${requestData}`,
            { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        return error;
    }
};

export const getCostCenterGroup = async (requestData, token) => {
    try {
        const { data } = await axios.get(
            `/reusable/getCostCenterGroup?employeeId=${requestData}`,
            { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        return error;
    }
};

export const getCostCodeDescId = async (costCenterGroupId, token) => {
    try {
        const { data } = await axios.post(
            `/reusable/getCostCodeDescId`,
            { costCodeGroupId: costCenterGroupId },
            { headers: { Authorization: `Bearer ${token}` } });
        return data;
    } catch (error) {
        return error;
    }
};