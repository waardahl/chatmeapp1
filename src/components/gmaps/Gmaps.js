import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentLocation: this.props.user.coordinates
 
  };
}

  createMarkers = () => {
    const { users } = this.props;
    const { user } = this.props;
    let table = [];

    for (var i = 0; i<users.length; i++) {
      if (users[i].name !== user.name) {
      table.push(
        <Marker onClick={this.onMarkerClick} name={"Here's you friend " + users[i].name } position = {users[i].coordinates} />
      );} 
    }
    return table
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
     const { user, users } = this.props;

    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google} user={user} users={users} currentLocation = {this.state.currentLocation}>
      <Marker onClick={this.onMarkerClick} name={"you are here " + user.name } /> 
        {/* generates markers for other users */}
      {this.createMarkers()}

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <div className="infoboxLocation">
          <h4>{this.state.selectedPlace.name}</h4>
        </div>
      </InfoWindow> 
    </CurrentLocation>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAvuy-sA7Rllb8GKEsLNpcw5OAd4ff8ecc'
})(MapContainer);
