import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import Map from './Map.js'

export class MapContainer extends Component {

	render() {
      const { originData,init,listData,query,updateQuery,showAPI} = this.props;
    	if (!this.props.loaded) {
      	return (
          <div>Map Loading...</div>
          )
    	}

      const bounds = new this.props.google.maps.LatLngBounds();
      originData.map((data)=>{
        return bounds.extend(data.position);
      })

return (
    		<Map 
          google = { this.props.google } 
          originData = { originData }
          listData = { listData }
          init = { init } 
          bounds={bounds}
          query ={query}
          updateQuery={updateQuery}
          showAPI={showAPI}
        >
        </Map>

    	)
  	}
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDQQ3kVfeOfa80soz3NS2xIpMjT4Fr4Xzo',
  libraries: ['places']
})(MapContainer)