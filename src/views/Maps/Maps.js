import React, { Component }  from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import mockData from './data';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


<<<<<<< HEAD
const GOOGLE_API_KEY = 'AIzaSyAGWkTVfH4RA2sRbFN9dY489Q-T1At2Fqk';
=======
import { compose, withProps, withStateHandlers } from "recompose";
const GOOGLE_API_KEY = 'Google-API-KEY';
>>>>>>> bda28ca77bcc560d9c4279da85892c1d708de1d6
const google_map_URL = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API_KEY;

var data = mockData

class Canvas extends Component {
  state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      initialCenter: {
        lat: 30.601389,
        lng: -96.314445
      },
      checked_Eng: false,
      checked_Spn: false,
      checked_Chn: false,
      checked_Kor: false,
    };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
  });
  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    console.log(mockData)
    for (var i=0; i<mockData.length; i++) {
      console.log(mockData[i].name);
      console.log(mockData[i].location.lat);
    }
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.checked
    })
    // filter the markers
    let newSelectedUsers = [];
    data = mockData;
    for (var i=0; i<mockData.length; i++){
      var langs = data[i].language.split(", ")
      if (langs.includes(event.target.value)){
        data.splice(i,1);
        // TODO: disable the markers
      }
    }
  };

  render() {
    var langs = []
    console.log(this.state);
    if (!this.props.loaded) return <div>Loading...</div>;
    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        initialCenter={this.state.initialCenter}
        style={{ height: '90%', position: 'relative', width: '100%', up: '10px' }}
        zoom={13}>
        {data.map(m => <Marker 
                    name={m.name} 
                    position={m.location}
                    language={m.language}
                    sex={m.sex}
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
            <h2 align='center'>{this.state.selectedPlace.name}</h2>
            <li>Language: {this.state.selectedPlace.language}</li>
            <li>Sex: {this.state.selectedPlace.sex}</li>
            <li>Age: {this.state.selectedPlace.age}</li>
            <a align='center' href='test'>Select</a>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (GOOGLE_API_KEY)
})(Canvas)
