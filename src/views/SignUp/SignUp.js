import React, {useState, useEffect} from 'react';
import {Link as RouterLink, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {makeStyles} from '@material-ui/styles';
import {Google as GoogleIcon} from 'icons';
import axios from "axios";
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    FormHelperText,
    Checkbox,
    Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const schema = {
    email: {
        presence: {allowEmpty: false, message: 'is required'},
        email: true,
        length: {
            maximum: 64
        }
    },
    password: {
        presence: {allowEmpty: false, message: 'is required'},
        length: {
            maximum: 128
        }
    },
    password2: {
        presence: {allowEmpty: false, message: 'is required'},
        length: {
            maximum: 128
        }
    },
    policy: {
        presence: {allowEmpty: false, message: 'is required'},
        checked: true
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/static/images/auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
    },
    quoteText: {
        color: theme.palette.white,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    bio: {
        color: theme.palette.white
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    policy: {
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    policyCheckbox: {
        marginLeft: '-14px'
    },
    signUpButton: {
        margin: theme.spacing(2, 0)
    }
}));

const SignUp = props => {
    const {history} = props;

    const classes = useStyles();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState(formState => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
    }, [formState.values]);

    const handleChange = event => {
        event.persist();

        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true
            }
        }));
    };

    const handleBack = () => {
        history.goBack();
    };

    const handleSignUp = event => {
        event.preventDefault();

        axios.post("/rest-auth/registration/", {
            password1: formState.values.password,
            password2: formState.values.password2,
            email: formState.values.email
        })
            .then(function (response) {
                alert("Logged in");
                console.log(response);
                history.push('/account');
            })
            .catch(function (error) {
                alert(error.message);
                console.log(error);
                history.push('/sign-up');
            });
    };

    const handleGoogleSignIn = event => {
        event.preventDefault();
        // alert("testing google window!!")
        window.location.href = '/accounts/google/login/';
    };

    const hasError = field =>
        formState.touched[field] && formState.errors[field] ? true : false;

    return (
        <div className={classes.root}>
            <Grid
                className={classes.grid}
                container
            >
                <Grid
                    className={classes.quoteContainer}
                    item
                    lg={5}
                >
                    <div className={classes.quote}>
                        <div className={classes.quoteInner}>
                            <Typography
                                className={classes.quoteText}
                                variant="h1"
                            >
                                Whoever needs, we are nearby to help.
                            </Typography>
                            <div className={classes.person}>
                                <Typography
                                    className={classes.name}
                                    variant="body1"
                                >
                                    Chien-Ping Chen
                                </Typography>
                                <Typography
                                    className={classes.bio}
                                    variant="body2"
                                >
                                    Founder at DeepMining
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid
                    className={classes.content}
                    item
                    lg={7}
                    xs={12}
                >
                    <div className={classes.content}>
                        <div className={classes.contentHeader}>
                            <IconButton onClick={handleBack}>
                                <ArrowBackIcon/>
                            </IconButton>
                        </div>
                        <div className={classes.contentBody}>
                            <form
                                className={classes.form}
                                onSubmit={handleSignUp}
                            >


                                <Typography
                                    className={classes.title}
                                    variant="h2"
                                >
                                    Create new account
                                </Typography>

                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    Sign up with social media
                                </Typography>
                                <Grid
                                    className={classes.socialButtons}
                                    container
                                    spacing={4}
                                >
                                    <Grid item>
                                        <Button
                                            onClick={handleGoogleSignIn}
                                            size="large"
                                            variant="contained"
                                        >
                                            <GoogleIcon className={classes.socialIcon}/>
                                            Sign up with Google
                                        </Button>


                                    </Grid>

                                </Grid>

                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    or use your email to create new account
                                </Typography>

                                <TextField
                                    className={classes.textField}
                                    error={hasError('email')}
                                    fullWidth
                                    helperText={
                                        hasError('email') ? formState.errors.email[0] : null
                                    }
                                    label="Email address"
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.email || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('password')}
                                    fullWidth
                                    helperText={
                                        hasError('password') ? formState.errors.password[0] : null
                                    }
                                    label="Password"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={formState.values.password || ''}
                                    variant="outlined"
                                />
                                <TextField
                                    className={classes.textField}
                                    error={hasError('password2')}
                                    fullWidth
                                    helperText={
                                        hasError('password2') ? formState.errors.password2[0] : null
                                    }
                                    label="Confirm Password"
                                    name="password2"
                                    onChange={handleChange}
                                    type="password"
                                    value={formState.values.password2 || ''}
                                    variant="outlined"
                                />
                                <div className={classes.policy}>
                                    <Checkbox
                                        checked={formState.values.policy || false}
                                        className={classes.policyCheckbox}
                                        color="primary"
                                        name="policy"
                                        onChange={handleChange}
                                    />
                                    <Typography
                                        className={classes.policyText}
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        I have read the{' '}
                                        <Link
                                            color="primary"
                                            component={RouterLink}
                                            to="#"
                                            underline="always"
                                            variant="h6"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </Typography>
                                </div>
                                {hasError('policy') && (
                                    <FormHelperText error>
                                        {formState.errors.policy[0]}
                                    </FormHelperText>
                                )}
                                <Button
                                    className={classes.signUpButton}
                                    color="primary"
                                    disabled={!formState.isValid}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Sign up now
                                </Button>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Have an account?{' '}
                                    <Link
                                        component={RouterLink}
                                        to="/sign-in"
                                        variant="h6"
                                    >
                                        Sign in
                                    </Link>
                                </Typography>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

SignUp.propTypes = {
    history: PropTypes.object
};

export default withRouter(SignUp);
