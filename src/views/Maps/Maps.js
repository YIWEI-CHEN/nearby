import React, { Component, useState }  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import mockData from './data';
import mockData2 from './data2';
import { withStyles, makeStyles } from '@material-ui/styles';
import { ProviderCard } from '../ProviderList/components';
import { IconButton, Grid, Typography, Button } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
 
const GOOGLE_API_KEY = 'AIzaSyAGWkTVfH4RA2sRbFN9dY489Q-T1At2Fqk';
const google_map_URL = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API_KEY;

const providers = mockData2;
//const [providers] = useState(mockData);

const styles = theme => ({
  root: {
  },
});

class Canvas extends Component {
  state = {
      activeMarker: {},
      activeProvider: {},
      selectedPlace: {},
      showingInfoWindow: false,
      initialCenter: {
        lat: 30.601389,
        lng: -96.314445
      },
      checked_Eng: true,
      checked_Spn: true,
      checked_Chn: true,
      checked_Kor: true,
  };
  onMarkerClick = (props, marker, e) => {
    var clickProvider = "";
    for (var i=0; i<mockData2.length; i++){
      if (providers[i].name == marker.name) {
        clickProvider = providers[i];
      }
    }
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      activeProvider: clickProvider,
      showingInfoWindow: true
    });
  }
    
    
  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    console.log(mockData2)
    for (var i=0; i<mockData2.length; i++) {
      console.log(mockData2[i].name);
      console.log(mockData2[i].location.lat);
    }
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked
    })
    // filter the markers
    let newSelectedUsers = [];
    var data = mockData2;
    for (var i=0; i<mockData2.length; i++){
      var langs = data[i].language.split(", ")
      if (langs.includes(event.target.value)){
        data.splice(i,1);
        // TODO: disable the markers
      }
    }
  };
  render() {
    var langs = [];
    //const {classes} = useStyles();
    if (!this.props.loaded) return <div>Loading...</div>;
    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        initialCenter={this.state.initialCenter}
        style={{ height: '90%', position: 'relative', width: '100%', up: '10px' }}
        zoom={13}>
        {providers.map(m => <Marker 
                    name={m.name} 
                    position={m.location}
                    sex={m.gender}
                    age={m.age}
                    onClick={this.onMarkerClick} 
                    />)}
        

        <div position="relative" left="30px" up="10px">
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checked_Eng}
                onChange={this.handleChange('checked_Eng')}
                value="English"
                color="primary"
              />
            }
            label="English"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checked_Spn}
                onChange={this.handleChange('checked_Spn')}
                value="Spanish"
                color="primary"
              />
            }
            label="Spanish"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checked_Chn}
                onChange={this.handleChange('checked_Chn')}
                value="Chinese"
                color="primary"
              />
            }
            label="Chinese"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checked_Kor}
                onChange={this.handleChange('checked_Kor')}
                value="Korean"
                color="primary"
              />
            }
            label="Korean"
          />
        </div>
 
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <ProviderCard provider={this.state.activeProvider} />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(Canvas)

