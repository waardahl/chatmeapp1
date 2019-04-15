import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.user);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentLocation: {
        lat: -1.2884,
        lng: 36.823
      }
 
  };
}

  createMarkers = () => {
    const { users } = this.props;
    let table = [];

    for (var i = 0; i<users.length; i++) {
      table.push(

        <CurrentLocation centerAroundCurrentLocation google={this.props.google} user={users[i]} currentLocation={this.state.currentLocation}>
        {/* <Marker onClick={this.onMarkerClick} name={"you are " + user.name + " and you are here"} /> */}
        
        {/* <Marker onClick={this.onMarkerClick} name={"you are here " + user.name } /> */}
        {/* generates markers for other users */}
        <Marker onClick={this.onMarkerClick} name={users[i].name}/>

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
    // const { user, users } = this.props;
    // console.log(users.map(u => u.name));
    // var skalle = "";
    // for (var i = 0; i<users.length; i++) {
      
    //   skalle += "name: " + users[i].name + " @ " + users[i].coordinates;
    // }

    return (
      <>
        {this.createMarkers()}
      </>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAvuy-sA7Rllb8GKEsLNpcw5OAd4ff8ecc'
})(MapContainer);
