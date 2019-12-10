import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

function ProductCategories(props) {
  const { classes } = props;

  const images = [
    // {
    //   url:
    //     // 'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400&q=80',
    //     'https://www.scripps.org/sparkle-assets/images/pregnant_woman_talking_to_doctor_1200x750-9629703634969243640.jpg',
    //   title: 'Pregnancy',
    //   width: '40%',
    // },
    // {
    //   url:
    //     'https://www.europeanlung.org/assets/components/phpthumbof/cache/paediatric_lung_disease.be9262e603ff996f5f4508dd341d0f93.jpg',
    //   title: 'Pulmonary',
    //   width: '20%',
    // },
    // {
    //   url:
    //     'https://www.inquirer.com/resizer/T9LmxKaHkIugN8uw5TTq7aOVRWo=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/HUMMNMXKZVFJTNGOMSC266XBBY.jpg',
    //   title: 'Hypertension',
    //   width: '40%',
    // },
    {
      url:
        'https://npuh82iut7x3aosxba3ol14m-wpengine.netdna-ssl.com/wp-content/uploads/2017/01/patient-education-min.jpg',
      title: 'Education',
      width: '38%',
    },
    {
      url:
        'https://s3.envato.com/files/247897705/Star_Luc_Spring_017.jpg',
      title: 'For disabled',
      width: '38%',
    },
    {
      url:
        'https://www.cancercenter.com/-/media/ctca/images/others/blogs/2017/09-september/03-blog-nutrition-l.jpg',
      title: 'Nutrition',
      width: '24%',
    },
    {
      url:
        'https://s3.amazonaws.com/utep-uploads/wp-content/uploads/DUQ-MIG/2019/07/01110253/bsn-nurse-giving-shot-to-child.jpg',
      title: 'Vaccinations',
      width: '40%',
    },
    {
      url:
        'https://assets.newatlas.com/dims4/default/36d2c3c/2147483647/strip/true/crop/1617x1079+0+1/resize/1160x774!/quality/90/?url=https%3A%2F%2Fassets.newatlas.com%2Farchive%2Fshutterstock_250798129_ogVok1j.jpg',
      title: 'Oversight',
      width: '20%',
    },
    {
      url:
        'https://www.inquirer.com/resizer/T9LmxKaHkIugN8uw5TTq7aOVRWo=/1400x932/smart/arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/HUMMNMXKZVFJTNGOMSC266XBBY.jpg',
      title: 'Routines',
      width: '40%',
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all needs, we are nearby to help
      </Typography>
      <div className={classes.images}>
        {images.map(image => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategories);
