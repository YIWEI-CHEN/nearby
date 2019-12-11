import React, { useState } from 'react';
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



class AccountDetails_class extends React.Component {




  render() {


const useStyles = makeStyles(() => ({
          root: {}
        }));


 const [values, setValues] = useState({
            firstName: 'Angel',
            lastName: 'Christina',
            email: 'angel@tamu.edu',
            phone: '9799115691',
            state: 'texas',
            country: 'USA'
          });


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

          const states = [
            // {
            //   value: 'texas',
            //   lable: 'Texas'
            // },
            {
              value: 'alabama',
              label: 'Alabama'
            },
            {
              value: 'new-york',
              label: 'New York'
            },
            {
              value: 'san-francisco',
              label: 'San Francisco'
            }
          ];

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



          console.log(this.props)

          const {className, ...rest} = this.props;

          console.log(className, rest)

          // const classes = useStyles();


          // // read_profiles();
          //
          // var data, data2;
          // async function read_profiles()  {
          //     return  await axios.get("/read_profiles/")
          // }
          // data = read_profiles();
          // // data= data.PromiseValue
          //
          // data.then(function (result) {
          //   data2 = result
          //
          //   // console.log( data2 )
          // }
          // )


          // console.log(this.props.show)
          // console.log(data);
          // console.log(data2);
          // console.log(data.__proto__);
          // console.log(data.PromiseStatus);
          // console.log(data.PromiseValue);




          return (

              <Card
                  {...rest}
                  // className={clsx(classes.root, className)}
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
                            label="Select State"
                            margin="dense"
                            name="state"
                            onChange={handleChange}
                            required
                            select
                            // eslint-disable-next-line react/jsx-sort-props
                            SelectProps={{native: true}}
                            value={values.state}
                            variant="outlined"
                        >
                          {states.map(option => (
                              <option
                                  key={option.value}
                                  value={option.value}
                              >
                                {option.label}
                              </option>
                          ))}
                        </TextField>
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

  }

}

AccountDetails_class.propTypes = {
  className: PropTypes.string
};

export default AccountDetails_class;
