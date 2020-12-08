import SignIn from './containers/Employee/SignIn/SignIn';
import Timesheet from './containers/Timesheet/Timesheet';
import ApproveOrUnapproveTimesheet from './containers/ApproveOrUnapproveTimesheet/ApproveOrUnapproveTimesheet';
import Logout from './containers/Employee/Logout/Logout';

const routes = [
    {
        path: "/home",
        name: "Employee Timesheet",
        rtlName: "",
        component: SignIn,
        needsAuth: false
    },
    {
        path: "/signin",
        name: "Sign In",
        rtlName: "",
        component: SignIn,
        needsAuth: false
    },
    {
        path: "/employeeTimesheet",
        name: "Timesheet",
        rtlName: "",
        component: Timesheet,
        needsAuth: true
    },
    {
        path: "/approveorUnapprove",
        name: "Approve / Unapprove Timesheet",
        rtlName: "",
        component: ApproveOrUnapproveTimesheet,
        needsAuth: true
    },
    {
        path: "/logout",
        component: Logout,
        needsAuth: true
    },
];

export default routes;
