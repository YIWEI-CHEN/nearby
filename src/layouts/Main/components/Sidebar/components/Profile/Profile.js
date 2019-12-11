import React, {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Angel Christina',
    avatar: '/static/images/product_5.png',
    bio: 'Care Provider'
  };



  const [values, setValues] = useState(user);


    useEffect(() => {
        axios
            .get(
                '/read_profiles/'
            )
            .then(
                ({data}) => {
                    // console.log(data.result[0].fields);

                    const values = data.result[0].fields;
                    if( data.result[0].fields.is_provider ){
                      console.log("is_provider");
                      values.bio = "Care Provider"
                    }
                    if( data.result[0].fields.is_taker ){
                      console.log("is_taker");
                      values.bio = "Care Taker"
                    }
                    // console.log(data[0]);
                    setValues(values);
                    // console.log(values);

                });
    }, []);

    console.log( values )


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {values.firstName + " " + values.lastName}
      </Typography>
      <Typography variant="body2">{values.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
