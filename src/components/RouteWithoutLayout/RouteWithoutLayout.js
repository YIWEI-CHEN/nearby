import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import theme from './theme';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import {ThemeProvider} from "@material-ui/styles";

const RouteWithoutLayout = props => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps =>(
          <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...matchProps} />
          </ThemeProvider>
      )}
    />
  );
};

RouteWithoutLayout.propTypes = {
  component: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default RouteWithoutLayout;
