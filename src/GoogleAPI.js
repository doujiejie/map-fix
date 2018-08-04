import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import Map from './Map.js'

export class MapContainer extends Component{

	render(){
		const { positionData,init } = this.props;
		if(!this.props.loaded){
			return <div>Loading...</div>
		}
		return(
			<Map google= {this.props.google} positionData= { positionData } init={ init }/>
		)
	} 
}

export default GoogleApiWrapper({
	apiKey:'AIzaSyDQQ3kVfeOfa80soz3NS2xIpMjT4Fr4Xzo',
	libraries: ['places']
})(MapContainer)