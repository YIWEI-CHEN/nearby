import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import { compose, withProps, withStateHandlers } from "recompose";
const GOOGLE_API_KEY = 'AIzaSyAGWkTVfH4RA2sRbFN9dY489Q-T1At2Fqk';
const google_map_URL = "https://maps.googleapis.com/maps/api/js?key=" + GOOGLE_API_KEY;

function handleClick(lat, lng){
  console.log(lat, lng);
}


function getCurLoc(){
 navigator.geolocation.getCurrentPosition(function(p){
     localStorage.setItem("lat", p.coords.latitude)
     localStorage.setItem("lng", p.coords.longitude)
    })
}

const MapWithAMakredInfoWindow = compose(
  withStateHandlers(() => ({
    currentLoc: {lat: Math.round(localStorage.lat*1000)/1000, lng: Math.round(localStorage.lng*1000)/1000},
    isOpen: false
    
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.currentLoc.lat, lng: props.currentLoc.lng }}
  >
    <Marker
      position={{ lat: props.currentLoc.lat, lng: props.currentLoc.lng}}
      onClick={props.onToggleOpen}
    >
      {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
        <p> Care Needed!! </p>
      </InfoWindow>}
    </Marker>

  </GoogleMap>
);

function Maps() {
  getCurLoc()
  return (
    <MapWithAMakredInfoWindow
      googleMapURL={google_map_URL}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default withRouter(Maps);
