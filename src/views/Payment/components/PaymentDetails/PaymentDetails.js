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

const useStyles = makeStyles(() => ({
  root: {}
}));

const PaymentDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    Name: 'Angel Christina',
    cardNumber: 'Credit Card Number',
    expirationDate: 'MM/YY',
    securityCode: 'CVC'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
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
          title="Payment Information"
        />
        <Divider />
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
                label="Name on Card"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.Name}
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
                label="Card Number"
                margin="dense"
                name="cardnumber"
                onChange={handleChange}
                type="number"
                required
                value={values.cardNumber}
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
                label="Expiration Date"
                margin="dense"
                name="expire"
                onChange={handleChange}
                required
                value={values.expirationDate}
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
                label="Security Code"
                margin="dense"
                name="securityCode"
                onChange={handleChange}
                required
                type="number"
                value={values.securityCode}
                variant="outlined"
              />
            </Grid>


          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Save Payment Information
          </Button>
        </CardActions>
      </form>



    </Card>
  );
};

PaymentDetails.propTypes = {
  className: PropTypes.string
};

export default PaymentDetails;
