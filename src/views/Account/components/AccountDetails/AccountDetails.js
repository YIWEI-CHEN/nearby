import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {}
}));

//
// function axiosGet() {
//              axios.get("/read_profiles/")
//             .then(function (response) {
//                 console.log( "sucess repeonse" )
//                 // console.log(response);
//                 data = response.data
//                 console.log(data);
//                 return data;
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
// }

// const data = await axios.get("/read_profiles/");

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'None',
    lastName: 'None',
    email: 'None',
    phone: 'None',
    state: 'None',
    country: 'None'
  });

  useEffect(() => {
    axios
    .get(
        '/read_profiles/'
    )
    .then(
        ({data}) => {
            console.log(data.result[0].fields);
            const values = data.result[0].fields;
            // console.log(data[0]);
            setValues(values);
            console.log(values);
        });
    }, []);
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdataProfiles = event => {
    console.log("test update")
    console.log(values);
    event.preventDefault();

    axios.post("/update_profiles/", {values})
    .then(function (response) {
        console.log("sucess repeonse")
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  };

    return (

    <Card
        {...rest}
        className={clsx(classes.root, className)}
    >
        <form
            autoComplete="off"
            noValidate
        >
            <CardHeader
                subheader="The information can be edited"
                title="Profile"
            />
            <Divider/>
            <CardContent>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            helperText="Please specify the first name"
                            label="First name"
                            margin="dense"
                            name="firstName"
                            onChange={handleChange}
                            required
                            value={values.firstName}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Last name"
                            margin="dense"
                            name="lastName"
                            onChange={handleChange}
                            required
                            value={values.lastName}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Email Address"
                            margin="dense"
                            name="email"
                            onChange={handleChange}
                            required
                            value={values.email}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Phone Number"
                            margin="dense"
                            name="phone"
                            onChange={handleChange}
                            type="number"
                            value={values.phone}
                            variant="outlined"
                        />
                    </Grid>
                     <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="State"
                            margin="dense"
                            name="state"
                            onChange={handleChange}
                            required
                            value={values.state}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TextField
                            fullWidth
                            label="Country"
                            margin="dense"
                            name="country"
                            onChange={handleChange}
                            required
                            value={values.country}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <Divider/>

            <CardActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleUpdataProfiles}
                >
                    Save details

                </Button>
            </CardActions>
        </form>
    </Card>
);
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
