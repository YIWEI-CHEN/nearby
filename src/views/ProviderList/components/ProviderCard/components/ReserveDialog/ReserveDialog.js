import React from 'react';
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
  const { onClose, open, provider } = props;
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleClose = () => {
    onClose();
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Select Services</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select care services provided by {provider.name}. You can add important reminding in Note.
          </DialogContentText>
          <TextField
            id="datetime-local"
            label="Reservation Time"
            type="datetime-local"
            defaultValue="2019-11-24T22:30"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
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
            autoFocus
            margin="dense"
            id="name"
            label="Note"
            type="note"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Reserve
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ReserveDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  provider: PropTypes.object.isRequired
};

export default ReserveDialog;