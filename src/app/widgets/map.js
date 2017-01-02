import React, {Component} from 'react';
import GoogleMapsLoader from 'google-maps';
GoogleMapsLoader.KEY = 'AIzaSyBvtIy9b86HtO508NSLa0cH7C2F31UQ-OQ';
import {connect} from 'react-redux';

// TODO: query limit !!!111
class GoogleMapRedux extends Component {
  constructor(props) {
    super(props);
    this.refCallback = this.refCallback.bind(this);
    this.markers = [];
  }

  componentDidMount() {
    GoogleMapsLoader.load(google => {
      this.map = new google.maps.Map(this.mapEl, {
        zoom: 12,
        center: {lat: 37.774, lng: -122.432}
      });
      // TODO: wierd stuff again mean this
      this.googleMaps = google.maps;
      this.Marker = google.maps.Marker;
      this.InfoWindow = google.maps.InfoWindow;
      this.googleGeocoder = new google.maps.Geocoder();
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
  }

  setMarkers(movies) {
    // TODO: mention bug not all in SF 180 one is in Taxes
    this.clearMarkers();
    movies.forEach(movie => {
      const address = `California, San Francisco, ${movie[10]}`;
      const name = movie[8];
      const markersPositions = JSON.parse(localStorage.getItem(name) || '[]');
      if (markersPositions.length) {
        markersPositions.forEach(position => {
          this.addMarker(name, address, position);
        });
      } else {
        (new Promise((resolve, reject) => {
          this.googleGeocoder.geocode({address}, (results, status) => {
            if (status === this.googleMaps.GeocoderStatus.OK) {
              const position = results[0].geometry.location;
              this.addMarker(name, address, position);
              markersPositions.push(position);
              resolve(position);
            } else {
              reject(status);
            }
          });
        }))
        .then(position => {
          // TODO: works but looks wierd
          let positions = localStorage.getItem(name) || [];
          if (positions) {
            positions = JSON.parse(positions);
            positions.push(position);
          }
          localStorage.setItem(name, JSON.stringify(positions));
        })
        .catch(status => {
          console.error(`Geocode was not successful for the following reason: ${status}`);
        });
      }
    });
  }

  addMarker(name, address, position) {
    const {map} = this;
    const marker = new this.Marker({
      map,
      position
    });
    const infowindow = this.createInfoWindow(name, address);
    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
    this.markers.push(marker);
  }

  createInfoWindow(name, address) {
    return new this.InfoWindow({
      content: `<div>Movie name: ${name}</div><div>Address: ${address}</div>`
    });
  }

  refCallback(mapEl) {
    this.mapEl = mapEl;
  }

  componentDidUpdate() {
    const {movies} = this.props;
    this.setMarkers(movies);
  }

  render() {
    return (
      <div className="map-container">
        <div id="map" ref={this.refCallback}></div>
      </div>
    );
  }
}

GoogleMapRedux.propTypes = {
  movies: React.PropTypes.array.isRequired
};

const mapStateToProps = store => {
  const {movies} = store.dataState;
  return {movies};
};

export const GoogleMap = connect(mapStateToProps)(GoogleMapRedux);
