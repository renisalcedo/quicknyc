import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const styles = {
    height: '80vh',
    width: '80%',
    margin: '0 auto'
}
 
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 40.72,
      lng: -73.99
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={styles}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: /*keyhere*/ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>

          <AnyReactComponent
            lat={40.727440}
            lng={-73.991724}
            text={'HERE'} />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;