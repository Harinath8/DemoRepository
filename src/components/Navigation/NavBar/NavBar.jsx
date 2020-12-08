import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.common.white,
    },
    authLink: {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
    },
    list: {
        width: 250,
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export default function NavBar(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const menuId = 'primary-search-account-menu';
    let renderMenu = (
        <Fragment>
            <Link to="/signin" className={classes.link}>
                <Button color="inherit">Login</Button>
            </Link>
        </Fragment>
    );

    if (props.isAuth) {
        renderMenu = (
            <Fragment>
                <Link to="/employeeTimesheet" className={classes.link}>
                    <Button color="inherit">Employee Timesheet</Button>
                </Link>
                <Link to="/approveorUnapprove" className={classes.link}>
                    <Button color="inherit">Approve or Unapprove</Button>
                </Link>
                <IconButton
                    edge="start"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    elevation={6}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <Link to="/logout" className={classes.authLink}>
                        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
                    </Link>
                </Menu>
            </Fragment>
        );
    }

    return (
        <div className={classes.grow}>
            <AppBar >
                <Toolbar>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={props.drawerToggleClicked}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>
                    <Link to="/home" className={classes.link}>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Employee Timesheet
                        </Typography>
                    </Link>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {renderMenu}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}




