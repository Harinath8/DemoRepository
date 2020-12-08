import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField'; 
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link, Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { checkValidity, updateObject } from '../../../utils/updateObject';
import PasswordInput from '../../../components/UI/PasswordInput/PasswordInput';
import { makeStyles, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    maindiv: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        marginTop: theme.spacing(8),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 10px',
        marginBottom: theme.spacing(6),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const initialState = {
    username: {
        value: '',
        validation: {
            required: true,
            isUserName: true,
            minLength: 3,
            maxLength: 15
        },
        validationMsg: 'Employee Name Required!',
        valid: false,
        touched: false
    },
    password: {
        value: '',
        validation: {
            required: true,
            isPassword: true,
            minLength: 6,
            maxLength: 16
        },
        validationMsg: 'Password Required!',
        valid: false,
        touched: false
    }
}

const SignIn = (props) => {
    const classes = useStyles();

    document.title="Sign In"

    const [loginForm, setLoginForm] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const isAuthenticated = useSelector(state => state.token !== null && state.employeeId !== null);
    const error = useSelector(state => state.error);

    const dispatch = useDispatch();
    const onLogin = (employeeName, password) => dispatch(actions.login(employeeName, password))

    const inputChangedHandler = (event, inputName) => {
        const validation = checkValidity(event.target.value, loginForm[inputName].validation);

        const updatedDetails = updateObject(loginForm, {
            [inputName]: updateObject(loginForm[inputName], {
                value: event.target.value,
                valid: validation.valid,
                validationMsg: validation.validationMsg,
                touched: true
            })
        });
        setLoginForm(updatedDetails);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        // event.preventDefault();
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (!loginForm.username.valid && !loginForm.password.valid) {
            const updatedForm = {
                ...loginForm,
                username: { ...loginForm.username, touched: true },
                password: { ...loginForm.password, touched: true }
            }
            setLoginForm(updatedForm);
        }

        if (loginForm.username.valid && loginForm.password.valid) {
            onLogin(loginForm.username.value, loginForm.password.value);
        }
    }

    let authRedirect = null;
    if (isAuthenticated) {
        authRedirect = <Redirect to='/' />
    }

    let errorMessage = null;
    if (error) {
        errorMessage = (
            <p style={{color: "red"}}>{props.error}</p>
        );
    }

    
    return (
        <Container component="main" maxWidth="xs" className={classes.maindiv}>
            <CssBaseline />
            <Paper elevation={12} className={classes.paper}>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {authRedirect}
                    {errorMessage}
                    <form className={classes.form} onSubmit={submitHandler} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="username"
                            label="Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            error={!loginForm.username.valid && loginForm.username.touched}
                            onChange={(event) => inputChangedHandler(event, "username")}
                            helperText={!loginForm.username.valid && loginForm.username.touched ?
                                loginForm.username.validationMsg
                                : null}
                        />
                        <PasswordInput
                            valid={loginForm.password.valid}
                            touched={loginForm.password.touched}
                            showPassword={showPassword}
                            errorMsg={loginForm.password.validationMsg}
                            inputChanged={inputChangedHandler}
                            togglePassword={handleClickShowPassword}
                            mouseDownPassword={handleMouseDownPassword}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/signin">
                                    {"Forgot password?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Paper>
        </Container>
    );
}


// const mapStateToProps = state => {
//     return {
//         isAuthenticated: state.token !== null && state.employeeId !== null,
//         error: state.error,
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         onLogin: (employeeName, password) => dispatch(actions.login(employeeName, password))
//     }; 
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignIn;