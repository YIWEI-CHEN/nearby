import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { Link as RouterLink } from 'react-router-dom';

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.secondary.light,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
});

function ProductHowItWorks(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/*<img*/}
          {/*src="/static/themes/onepirate/productCurvyLines.png"*/}
          {/*className={classes.curvyLines}*/}
          {/*alt="curvy lines"*/}
        {/*/>*/}
        <Typography variant="h4" marked="center" className={classes.title} component="h2">
          Why use Nearby
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <img
                  src = "https://image.flaticon.com/icons/png/512/1058/1058854.png"
                  // src="http://turnbowsigns.com/wp-content/uploads/nbdesigner/cliparts/hand/helping-hands.svg"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h6" className={classes.title}>
                Helps on Demand
              </Typography>
                <Typography variant="h5" align="center">
                  Get the reliable help as you need with easy booking.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img
                  src="https://cdn3.iconfinder.com/data/icons/business-631/50/69-512.png"
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h6" className={classes.title}>
                Budget-friendly options
                </Typography>
                <Typography variant="h5" align="center">
                  Same quality but cheaper, and you can enjoy the service at home.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src="https://cdn4.iconfinder.com/data/icons/business-and-office-4-4/128/175-512.png"
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h6" className={classes.title}>
                Easy Location Access
                </Typography>
                <Typography variant="h5" align="center">
                  {'Find someone who needs help or can help you near you.'}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component={CustomRouterLink}
          to="/sign-up"
        >
          Get started
        </Button>
      </Container>
    </section>
  );
}

ProductHowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductHowItWorks);
