import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';

export class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      showChatButton: true,
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
        <Marker onClick={this.onMarkerClickTrue} name={"Here's you friend " + users[i].name } position = {users[i].coordinates} />

      );} 
    }
    return table
  }

  onMarkerClickTrue = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      showChatButton: true
    });
  }

  onMarkerClickFalse = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      showChatButton: false
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  showButtonInfoWindow = () => {
    let table = [];
    if (this.state.showChatButton === true) {
      table.push(<button>Start baby chat</button>);
     }
     return table
  }

  render() {
    const { user, users } = this.props;

    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google} user={user} users={users} currentLocation = {this.state.currentLocation}>
      <Marker onClick={this.onMarkerClickFalse} name={"you are here " + user.name } /> 
        {/* generates markers for other users */}
      {this.createMarkers()}

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        content={this.state.showChatButton}
        onClose={this.onClose}
      >
        <div className="infoboxLocation">
          <h4>{this.state.selectedPlace.name}</h4>
          {/* onClick={this.addChatForUser(otherUser.name)} */}

          {this.showButtonInfoWindow()}

        </div>
      </InfoWindow> 
    </CurrentLocation>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAvuy-sA7Rllb8GKEsLNpcw5OAd4ff8ecc'
})(MapContainer);
