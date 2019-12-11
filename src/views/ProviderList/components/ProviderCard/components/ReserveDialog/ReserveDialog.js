import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/styles';
import {Typography} from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const ReserveDialog = props =>  {
  const { onClose, open, isReserved, provider, history } = props;
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const [formState, setFormState] = useState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
  });
  const defaultTime = "2019-11-24T22:30";

  const handleClose = () => {
    onClose();
  };

  const handleReserve = () => {
    const newChecked = [...checked];
    newChecked.shift();

    const services = provider.providedServices.map(s => {
        return {
            care: {name: s.label},
            checked: newChecked.includes(s.label)? true: false,
        };
    });
    axios
      .post("/api/cares/", {
        time: formState.values.time || defaultTime,
        note: formState.values.note,
        provider: provider.id,
        taker: 1,
        services: services,
      })
      .then(function (response) {
          console.log(response);
          isReserved(true);
          history.push('/care');
      })
      .catch(function (error) {
          alert(error);
          // console.log(error);
      });
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (newChecked.length > 1) {
      formState.isValid = true;
    } else {
      formState.isValid = false;
    }
    setFormState(formState);
    setChecked(newChecked);
  };

  const handleChange = event => {
      event.persist();

      setFormState(formState => ({
          ...formState,
          values: {
              ...formState.values,
              [event.target.name]:
                  event.target.type === 'checkbox'
                      ? event.target.checked
                      : event.target.value
          },
          touched: {
              ...formState.touched,
              [event.target.name]: true
          }
      }));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select Services</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select care services provided by {provider.name}. You can add important reminding in Note.
          </DialogContentText>
          <form
              onSubmit={handleReserve}
          >
            <TextField
              id="datetime-local"
              label="Reservation Time"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              name="time"
              value={formState.values.time || defaultTime}
              onChange={handleChange}
            />
            <List dense className={classes.root}>
              {provider.providedServices.map(value => {
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
                        edge="end"
                        onChange={handleToggle(value.label)}
                        checked={checked.indexOf(value.label) !== -1}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
             </List>
            <TextField
              className={classes.textField}
              autoFocus
              margin="dense"
              fullWidth
              id="note"
              label="Note"
              name="note"
              onChange={handleChange}
              type="text"
              value={formState.values.note || ''}
              variant="outlined"
            />
            <Button
                color="primary"
                variant="contained"
                disabled={!formState.isValid}
                fullWidth
                type="submit"
            >
              Reserve
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

ReserveDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  isReserved: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  provider: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default ReserveDialog;