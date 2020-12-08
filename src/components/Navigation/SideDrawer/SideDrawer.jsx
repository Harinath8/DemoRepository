import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AccountCircle, ExpandLess, ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { Avatar, Collapse } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import LocalDiningIcon from '@material-ui/icons/LocalDining';

const useStyles = makeStyles((theme) => ({
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 280,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));


export default function SideDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    props.sideDrawer(open);
    // props.closed();
  };

  let sideBarMenu = (
    <Fragment>
      <Link className={classes.link} to="/signin" >
        <ListItem button key="Login" onClick={props.closed}>
          <ListItemIcon><Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar></ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
      </Link>
    </Fragment>
  );

  if (props.isAuth) {
    sideBarMenu = (
      <Fragment>
        <ListItem button onClick={handleClick}>
          <ListItemIcon><Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar></ListItemIcon>
          <ListItemText primary="User" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link className={classes.link} to="/employeeTimesheet">
              <ListItem button key="Register" className={classes.nested} onClick={props.closed}>
                <ListItemIcon>
                  <PermContactCalendarIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Details" />
              </ListItem>
            </Link>
            <Link className={classes.link} to="/approveorUnapprove">
              <ListItem button className={classes.nested} onClick={props.closed}>
                <ListItemIcon>
                  <LocalDiningIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Orders" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
        <Link className={classes.link} to="/logout" >
          <ListItem button key="Login" onClick={props.closed}>
            <ListItemIcon><Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </Link>
      </Fragment>
    );
  }


  return (
    <div className={classes.sectionMobile}>
      <SwipeableDrawer
        anchor='left'
        open={props.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          className={classes.list}
          role="presentation"
        >
          <List>
            <Link className={classes.link} to="/">
              <ListItem button key="Index" onClick={props.closed}>
                <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Divider />
            {sideBarMenu}
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}
