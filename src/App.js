import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";

import SignIn from './containers/Employee/SignIn/SignIn';
import Timesheet from './containers/Timesheet/Timesheet';
import ApproveOrUnapproveTimesheet from './containers/ApproveOrUnapproveTimesheet/ApproveOrUnapproveTimesheet';
import Logout from './containers/Employee/Logout/Logout';
import Layout from "./hoc/Layout/Layout";

// import routes from './routes';
import * as actions from "./store/actions/index";


// const RenderRoutes = (route, isAuthenticated) => {
//   const history = useHistory();
//   if (route.needsAuth && !isAuthenticated) {
//     history.push("/signin");
//   }

//   return (
//       <Route
//         path={route.path}
//         exact
//         // component={route.component}
//         render={(props) => <route.component {...props} />}
//       >
//       </Route>
//   );
// };

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  isAuthenticated = this.props.isAuthenticated

  render() {
    let routes = (
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/" component={SignIn} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/approveorUnapprove" component={ApproveOrUnapproveTimesheet} />
          <Route path="/employeeTimesheet" component={Timesheet} />
          <Route exact path="/" component={Timesheet} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null && state.employeeId !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
