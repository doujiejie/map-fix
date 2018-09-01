import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class Map extends Component {

  state = {
    map: [],
    markers: [],
  }

  componentDidMount() {
    this.loadMap(this.props.listData);
    // console.log('did mount!!!');
  }

  // componentDidUpdate() {
  //   let map;
  //   const { google, listData } = this.props;
  //   const mapRef = this.refs.map;
  //   const node = ReactDOM.findDOMNode(mapRef);
  //   const { lat, lng, zoom } = this.props.init;
  //   const center = new google.maps.LatLng(lat, lng);
  //   const mapConfig = Object.assign({}, {
  //     center: center,
  //     zoom: zoom
  //   })
  //   map = new google.maps.Map(node, mapConfig);
  //   this.setMarkerAndInfo(listData, map)
  //   console.log('will update!!!')
  // }

  componentWillReceiveProps(nextProps){
    const { markers } = this.state;
    const { google } = this.props;
    // console.log(this.props.clickedData)
    // console.log(nextProps.clickedData)
    if(this.props.clickedData !== nextProps.clickedData){
      console.log('clickedData changed!!!')
      console.log(nextProps.clickedData)

      for(let i=0;i<markers.length;i++){
        if((markers[i].title) === nextProps.clickedData){
          console.log(markers[i].title);
          this.setState({
            marker: markers[i]
          },()=>{
            google.maps.event.trigger(this.state.marker, 'click');
          })
        }
      }
    }
    
    // console.log(this.props.listData)
    // console.log(nextProps.listData)
    if(this.props.listData !== nextProps.listData){
        this.loadMap(nextProps.listData);
    }
  }

  //load initial map
  loadMap(data) {
    const { google } = this.props;
    if (this.props && this.props.google) {
      let map;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      const { lat, lng, zoom } = this.props.init;
      const center = new google.maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      map = new google.maps.Map(node, mapConfig);
      this.setMarkerAndInfo(data, map)
    }
  }

  //init Marker and API infowindow
  setMarkerAndInfo = (data, thisMap) => {
    let markers = [];
    const { google, bounds, showAPI } = this.props
    for (var i = 0; i < data.length; i++) {
      let marker = new google.maps.Marker({
        position: data[i].position,
        map: thisMap,
        title: data[i].title.EN,
        id: data[i].id,
        "tabIndex": 0
      });

      const largeInfowindow = new google.maps.InfoWindow();
      marker.addListener('click', function() {
        console.log(this)

        //use API
        showAPI(this, largeInfowindow,thisMap);
      });
      markers.push(marker);
    };
    thisMap.fitBounds(bounds);
    this.setState({
      markers: markers
    })
  };

  // showInfo = (marker,infowindow,thisMap) => {
  //         if (infowindow.marker !== marker) {
  //       infowindow.marker = marker;
  //       infowindow.setContent('<div>' + marker.title.JPN + '</div>');
  //       infowindow.open(thisMap, marker);
  //       infowindow.addListener('closeclick',function(){
  //         infowindow.marker = null;
  //       });
  //     }
  //   }

  render() {
    return ( 
      <div ref = 'map' className = "map" id = "map" role="application" tabIndex="-1"></div>
    );
  };
};

export default Map;