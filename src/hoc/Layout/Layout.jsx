import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom';

import NavBar from '../../components/Navigation/NavBar/NavBar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css'
import { connect } from 'react-redux';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawer = (open) => {
        setShowSideDrawer(open);
    }

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((prevState) => {
            return !prevState.showSideDrawer;
        });
    }

    return (
        <Fragment>
            <NavBar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={showSideDrawer}
                sideDrawer={sideDrawer}
                opened={sideDrawerToggleHandler}
                closed={sideDrawerClosedHandler} />

            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null && state.employeeId !== null
    };
};

export default withRouter(connect(mapStateToProps)(Layout));
