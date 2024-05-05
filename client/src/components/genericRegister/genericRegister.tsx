import * as React from 'react';
import classes from './genericRegister.module.css';
import {
    OutlinedInput,
    FormHelperText,
    InputAdornment,
    IconButton,
    Link
} from '@mui/material';

import { useForm } from "react-hook-form";

import Visibility from '@mui/icons-material/VisibilityOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOffOutlined';
import Button from '../button/button';
import { PATHNAMES } from '../../utils/constants';
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { RootState } from '../../redux/reduxStore';
import { LoginRequestI, SignUpRequestI } from '../../redux/user/types';
import { useToastMessage } from '../toastMessage/';

import { 
    login as action_login,
    signUp as action_signUp
} from '../../redux/user/action';

import { 
    LoginI,
    GenericRegisterRequestI
} from '../../interfaces';

interface GenericRegisterI {
    data: LoginI;
    login: (data: LoginRequestI, onSuccess: () => void, onError: (error: string) => void) => void;
    signUp: (data: SignUpRequestI, onSuccess: () => void, onError: (error: string) => void) => void;
}

const GenericRegister = (props: GenericRegisterI) => {

    const { 
        data: { 
            name: componentName,
            slug 
        },
        login,
        signUp,
    } = props;

    const [showPassword, setShowPassword] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleEmailValidation = (value: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!value || !emailRegex.test(value)) {
        return "Invalid email address";
        }
        return true;
    };

    const handlePasswordValidation = (value: string) => {
        if (!value) {
          return "Password is required.";
        }
        if (value.length < 8) {
          return "Password must be at least 8 characters long.";
        }
        if (!/[a-zA-Z]/.test(value)) {
          return "Password must contain at least one letter.";
        }
        if (!/\d/.test(value)) {
          return "Password must contain at least one number.";
        }
        if (!/[!@#$%^&*]/.test(value)) {
          return "Password must contain at least one special character.";
        }
        return true;
      };

    const handleSubmitForm = (data: GenericRegisterRequestI) => {

        if(slug === 'login') {

            const loginRequest: LoginRequestI = {
                email: data.email as string,
                password: data.password as string,
            }
            login(loginRequest, handleOnLoginSuccess, toastOnError)
            return;

        } else {

            const SignUpRequest: SignUpRequestI = {
                email: data.email as string,
                password: data.password as string,
                name: data.name as string,
            }
            signUp(SignUpRequest, handleOnLoginSuccess, toastOnError);
            return;
        }
    };

    const handleOnLoginSuccess = () => {
        toastOnSuccess();
        navigate(PATHNAMES.dashboard);
    };


    const { toastOnError, toastOnSuccess } = useToastMessage({
        successProps: {
            title: "Login SuccessFull",
            description: ``
        },
        errorProps: {
            title: 'Login Error:'
        }
    });
    
    const emailError: string = errors?.email?.message as string;
    const passwordError: string = errors?.password?.message as string;
    const nameError: string = errors?.name?.message as string;

    const loginDescription: string = 'Welcome back! Please enter your details to login.';
    const SignUpDescription: string = 'Welcome! Please enter your details for sign-up.';

    return (
        <div className={classes.main}>

            <div className={classes.logoWrapper}>
            </div>

            <div className={classes.formWrapper}>

                <div className={classes.header}>
                    <h2 className={classes.heading}>{componentName}</h2>
                    <p className={classes.description}>{slug === 'login' ? loginDescription : SignUpDescription}</p>
                </div>

                <div className={classes.form}>

                    {slug === 'signup' && (

                    <div className={classes.inputWrapper}>
                        <FormHelperText  className={classes.inputLabel}>Name</FormHelperText>
                        <OutlinedInput
                            inputProps={{
                                'aria-label': 'name',
                                className: classes.input
                            }}
                            fullWidth

                            {...register("name", {
                                required: "Please provide your name.",
                            })}
                        />

                        {!!nameError && <FormHelperText className={classes.inputError}>{nameError}</FormHelperText>}
                    </div>
                    )
                    }

                    <div className={classes.inputWrapper}>
                        <FormHelperText  className={classes.inputLabel}>Email</FormHelperText>
                        <OutlinedInput
                            inputProps={{
                                'aria-label': 'email',
                                className: classes.input
                            }}
                            fullWidth

                            {...register("email", {
                                required: "Please provide your email.",
                                validate: handleEmailValidation,
                            })}
                        />

                        {!!emailError && <FormHelperText className={classes.inputError}>{emailError}</FormHelperText>}
                    </div>

                    <div className={classes.inputWrapper}>
                        <FormHelperText id="outlined-password-helper-text" className={classes.inputLabel}>
                            Password
                        </FormHelperText>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            classes={{
                                root: classes.inputRoot,
                                notchedOutline: classes.inputFieldset
                            }}
                            aria-describedby="outlined-password-helper-text"
                            inputProps={{
                                'aria-label': 'password',
                                className: classes.input,
                            }}
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    className={classes.visibleIconButton}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }

                        {...register("password", {
                            required: "Please provide your password.",
                            validate: handlePasswordValidation,
                        })}
                        />

                        {!!passwordError && <FormHelperText className={classes.inputError}>{passwordError}</FormHelperText>}
                    </div>

                    <div>
                        <Button
                            fullWidth
                            color='primary'
                            size='large'
                            onClick={handleSubmit(handleSubmitForm)}
                            >
                            {slug === 'login' ? 'Log in' : 'Sign Up'}
                        </Button>

                    </div>

                </div>


            </div>

            {slug === 'login' && (<div className={classes.nearStepWrapper}>
                Don’t have an account?
                <Link href={PATHNAMES.signUp} variant="body2" className={classes.link}>
                Sign up
                </Link>
            </div>)}
        </div>
    )

}

const mapStateToProps = function (state: RootState) {
    const { user: { error, data } } = state;
  
    return {
      responseError: error as string,
      userData: data,
    }
}
  
const mapDispatchToProps = {
    login: action_login,
    signUp: action_signUp
}
  
export default connect(mapStateToProps, mapDispatchToProps)(GenericRegister)
