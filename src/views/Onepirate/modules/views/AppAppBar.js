import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';
import axios from "axios";

const styles = theme => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;


    const [values, setValues] = useState({
    firstName: 'Sign In'

  });

    // const signInorOut  = "Sign Up"

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



  if( values.firstName )


  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {'nearby'}
          </Link>

          <div className={classes.right}>


            <RouterLink
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              to="/sign-in"
            >
              {/*{values.firstName}*/}
              {'Sign In'}
            </RouterLink>


            <RouterLink
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              to="/sign-up"
            >
              {'Sign Up'}
            </RouterLink>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
