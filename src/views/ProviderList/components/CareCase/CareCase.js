import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  Button,
  Grid, CardHeader, TextField
} from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import CardMedia from '@material-ui/core/CardMedia';
import axios from "axios";

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
  image2: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
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
  },
  textField: {
    margin: theme.spacing(1),
    width: 600,
  },
  divider: {
    margin: theme.spacing(0.2),
  },
  cover: {
    width: 151,
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
}));

const statusMapping = {
  0: 'Send Request',
  1: 'Accept Request',
  2: 'Decline Request',
  3: 'Serving Request',
  4: 'Finish Request',
};
const DONE = 4;

const CareCase = props => {
  const { className, user, ...rest } = props;

  const classes = useStyles();

  const [caseInfo, setCaseInfo] = useState({
    type: user.is_taker? "taker": "provider",
    name: 'No Cases',
    imageUrl: '/static/images/not_found.png',
    providedServices: [
      // { label: 'Shower', price: '1', checked: true },
      // { label: 'Blood Pressure Measurement', price: '1', checked: false },
      // { label: 'Medicine Feeding', price: '1', checked: true },
      // { label: 'Upper Limbs Moving', price: '1', checked: true },
      // { label: 'Turn Body Over', price: '1', checked: false },
    ],
    languages: [
      // 'English',
      // 'Chinese',
      // 'Spanish'
    ],
    note: '',
    serviceTime: "",
    status: 0,
    empty: true,
  });

  const updateStatus = () => {
    console.log('Update case ID: ' + caseInfo);
    axios.patch(
        '/api/cares/' + caseInfo.id + '/',
        {status: DONE}
    ).then(({data}) => {
      setCaseInfo({
        ...caseInfo,
        status: DONE,
      });
      console.log('Succeed to change status');
    });
  };


  useEffect(() => {
    let case_info = {}
    axios
      .get(
          '/api/users/' + user.user + '/'
      )
      .then(({data}) => {
        const cases = user.is_taker? data.taker_cases: data.provider_cases;
        const latest_case = cases.pop();
        console.log(latest_case);
        const show_user = user.is_taker? latest_case.provider: latest_case.taker;
        case_info = {
          empty: latest_case.status == DONE? true: false,
          type: user.is_taker? "taker": "provider",
          id: latest_case.id,
          status: latest_case.status,
          note: latest_case.note,
          serviceTime: latest_case.time.substring(0, 16),
          providedServices: latest_case.services.map(s => {
            return {
              label: s.care.name,
              price: s.care.price,
              checked: s.checked,
            };
          })
        };
        return axios.get('/api/users/'+ show_user + '/');
      })
      .then(({data}) => {
        // console.log(data);
        const mapping = {
          'en': 'English',
          'es': 'Spanish',
          'zh': 'Chinese',
        };
        if (data === null) {
          setCaseInfo({});
          return
        }
        case_info = {
          ...case_info,
          languages: data.language_set.map(l => mapping[l.language]),
          name: data.generalprofile.firstName + ' ' + data.generalprofile.lastName,
          imageUrl: data.generalprofile.image_url,
        };
        console.log(case_info);
        setCaseInfo(case_info);
      })
        .catch(error => {
          console.log(error);
        });
  }, []);

  return (
    <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          {caseInfo.empty? (
              <div className={classes.content}>
                <Typography variant="h1">
                  No Request
                </Typography>
                {/*<Typography variant="subtitle2">*/}
                  {/*You either tried some shady route or you came here by mistake.*/}
                  {/*Whichever it is, try using the navigation*/}
                {/*</Typography>*/}
                <img
                  alt="Under development"
                  className={classes.image2}
                  src="/static/images/not_found.png"
                />
              </div>
            ): (
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
              <CardHeader
                subheader="The information for the service"
                title="Care Service Request"
              />
              <Divider className={classes.divider}/>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                >
                  {caseInfo.type==="taker"? "Care Provider": "Care Taker"}
                </Typography>
                <div className={classes.imageContainer}>
                  <img
                    alt="Provider"
                    className={classes.image}
                    src={caseInfo.imageUrl}
                  />
                </div>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h6"
                >
                  {caseInfo.name}
                </Typography>
                <Divider className={classes.divider}/>
                {caseInfo.type === "taker" &&
                  <div>
                    <Typography gutterBottom variant="h5">
                      Languages
                    </Typography>
                    {caseInfo.languages.map(data => {
                      return (
                          <Chip
                              label={data}
                              key={data}
                              className={classes.chip}
                              variant="outlined"
                              color="secondary"
                          />
                      );
                    })}
                    <Divider className={classes.divider}/>
                  </div>
                }
                <Typography gutterBottom variant="h5">
                  Service Time
                </Typography>
                <TextField
                  id="datetime-local"
                  // fullWidth={true}
                  type="datetime-local"
                  variant="outlined"
                  defaultValue={caseInfo.serviceTime}
                  className={classes.textField}
                  InputProps={{
                    readOnly: true,
                    // shrink: true,
                  }}
                />
                <Divider className={classes.divider}/>
                <Typography gutterBottom variant="h5">
                  Cares
                </Typography>
                <Divider className={classes.divider}/>
                <List dense className={classes.root}>
                  {caseInfo.providedServices.map(value => {
                    const labelId = `checkbox-list-secondary-label-${value.label}`;
                    return (
                      <ListItem key={value.label} button>
                        <ListItemText id={labelId} primary={`${value.label}`} />
                        <Typography
                          display="inline"
                          variant="body2"
                        >
                          ${value.price}
                        </Typography>
                        <ListItemSecondaryAction>
                          <Checkbox
                            disabled
                            checked={value.checked}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
                <Divider className={classes.divider}/>
                <Typography gutterBottom variant="h5">
                  Note
                </Typography>
                <TextField
                  id="standard-read-only-input"
                  className={classes.textField}
                  variant="outlined"
                  defaultValue={caseInfo.note}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Divider />
                {caseInfo.type === "taker" &&
                  <div>
                    <Typography gutterBottom variant="h5">
                      Status
                    </Typography>
                    <Chip
                      label={statusMapping[caseInfo.status]}
                      className={classes.chip}
                      color="primary"
                    />
                  </div>
                }
              </CardContent>
              {caseInfo.type === "provider" && caseInfo.status === 0 &&
                <div>
                  <Divider className={classes.divider}/>
                  <CardActions>
                    {/*<Button color="primary"*/}
                      {/*disabled={caseInfo.name === "No Cases"}*/}
                    {/*>*/}
                      {/*Decline*/}
                    {/*</Button>*/}
                    {/*{caseInfo.status === 0 &&*/}
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={updateStatus}
                      fullWidth
                    >
                     Serve Request
                    </Button>
                    {/*}*/}
                  </CardActions>
                </div>
              }
            </Card>
          )}
        </Grid>
    </Grid>
  );
};

CareCase.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

export default CareCase;
