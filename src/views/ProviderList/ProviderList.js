import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ProvidersToolbar, ProviderCard } from './components';
import mockData from './data';
import axios from "axios";
import PropTypes from "prop-types";
import CareCase from "./components/CareCase";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const ProviderList = props => {
  const { history } = props;
  const classes = useStyles();

  const [providers, setProviders] = useState(mockData);
  const [role, setRole] = useState("taker");
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
    axios
      .get(
        '/api/users/1/reserve/'
      )
      .then(({ data }) => {
        setReserved(data.reserved);
      });
    axios
      .get(
        '/api/providers/'
      )
      .then(({ data }) => {
        const mapping = {
          'en': 'English',
          'es': 'Spanish',
          'zh': 'Chinese',
        };
        const providers = data.map(d => {
          return {
            id: d.pk,
            name: d.first_name + ' ' + d.last_name,
            imageUrl: d.generalprofile.image_url,
            rate: d.generalprofile.rate,
            numberOfComments: d.generalprofile.num_of_comments,
            languages: d.language_set.map(l => mapping[l.language]),
            providedServices: d.providedcareservice_set.map(s => {
                  return {
                    label: s.care.name,
                    price: s.care.price,
                  }}),
          };
        });
        // console.log(data[0]);
        // console.log(providers);
        setProviders(providers);
      });
  }, []);
  if (reserved === true) {
    return (
        <CareCase />
    );
  }
  return (
    <div className={classes.root}>
      <ProvidersToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {providers.map(provider => (
            <Grid
              item
              key={provider.id}
              lg={4}
              md={6}
              xs={12}
            >
              <ProviderCard provider={provider} history={history} isReserved={setReserved}/>
            </Grid>
          ))}
        </Grid>
      </div>
      {/*<div className={classes.pagination}>*/}
        {/*<Typography variant="caption">1-6 of 20</Typography>*/}
        {/*<IconButton>*/}
          {/*<ChevronLeftIcon />*/}
        {/*</IconButton>*/}
        {/*<IconButton>*/}
          {/*<ChevronRightIcon />*/}
        {/*</IconButton>*/}
      {/*</div>*/}
    </div>
  );
};

ProviderList.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ProviderList);
