import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import StarRateIcon from '@material-ui/icons/StarRate';

const useStyles = makeStyles(theme => ({
  root: {
  },
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  },
  chip: {
    marginRight: theme.spacing(0.8),
    marginBottom: theme.spacing(0.8),
  }
}));

const ProviderCard = props => {
  const { className, provider, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="Provider"
            className={classes.image}
            src={provider.imageUrl}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {provider.name}
        </Typography>
        {/*<Chip className={classes.chip} label="Measurement" variant="outlined"/>*/}
        {/*<Chip className={classes.chip} color="primary" label="Cleanness" variant="outlined"/>*/}
        {/*<Chip className={classes.chip} label="Feeding" variant="outlined"/>*/}
        {/*<Chip className={classes.chip} label="Help Exercise" variant="outlined"/>*/}
        {provider.providedServices.map(data => {
          return (
            <Chip
              label={data.label}
              className={classes.chip}
              variant="outlined"
              color="primary"
            />
          );
        })}
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              display="inline"
              variant="body2"
            >
              {provider.rate}
            </Typography>
            <StarRateIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              ({provider.numberOfComments})
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <Button
              color="primary"
              variant="contained"
              size="small"
            >
              Reserve
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ProviderCard.propTypes = {
  className: PropTypes.string,
  provider: PropTypes.object.isRequired
};

export default ProviderCard;
