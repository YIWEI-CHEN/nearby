import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, RouteWithoutLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  // Typography as TypographyView,
  // Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Onepirate as HomeView
} from './views';

const Routes = () => {
  return (
    <Switch>
        <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/under_guardianship"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/cases"
      />
      <Redirect
        exact
        from="/"
        to="/home"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithoutLayout
        component={HomeView}
        exact
        path="/home"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
