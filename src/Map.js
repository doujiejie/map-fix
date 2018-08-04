import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class Map extends Component {

  componentDidMount() {
  	this.loadMap();
  }

  loadMap() {
  	console.log(this.props.init);
    if (this.props && this.props.google) {
      const { google } = this.props;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const { lat, lng, zoom } = this.props.init;
      const center = new google.maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new google.maps.Map(node, mapConfig);
    }
  }

  render() {
    const { originData } = this.props;
    const { google } = this.props;

    return ( 
    	<div ref = 'map' className = "map" >
    	</div>
    );
  };
};

export default Map;