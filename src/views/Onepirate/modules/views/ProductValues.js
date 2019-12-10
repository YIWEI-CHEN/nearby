import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),

  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/*<img*/}
          {/*src="/static/themes/onepirate/productCurvyLines.png"*/}
          {/*className={classes.curvyLines}*/}
          {/*alt="curvy lines"*/}
        {/*/>*/}
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://ld-wp73.template-help.com/beclinic/default/wp-content/uploads/2019/10/icon-img-1.png"
                alt="suitcase"
              />
              <Typography variant="h6" className={classes.title}>
                Experienced Medical Specialists
              </Typography>
              <Typography variant="h5">
                {'Your health is your most important asset.'}
                {'You should entrust it only to the best professionals.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://ld-wp73.template-help.com/beclinic/default/wp-content/uploads/2019/10/icon-img-2.png"
                alt="graph"
              />
              <Typography variant="h6" className={classes.title}>
                Personalized Treatment
              </Typography>
              <Typography variant="h5">
                {'Treatment choices perfectly match your goals of treatment complications with early intervention.'}
                {'complications with early intervention.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img
                className={classes.image}
                src="https://ld-wp73.template-help.com/beclinic/default/wp-content/uploads/2019/10/icon-img-3.png"
                alt="clock"
              />
              <Typography variant="h6" className={classes.title}>
                Quality and Safety
              </Typography>
              <Typography variant="h5">
                {'All team members and care providers at Nearby have been trained '}
                {'thoroughly to assist in any situation.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);
