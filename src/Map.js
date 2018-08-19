import React, { Component } from 'react';
import ReactDOM from 'react-dom'


  function showAPI(marker, infowindow,thisMap) {
    let searchedForText = marker.title;
    fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=ed11ce69c5b2490e9a4c4e41e1aa686d`, {
      // headers: {
      //     Authorization: 'Client-ID bd18852d92f956937def8d7f0ab0f6d3fc1acf00cf096af4f143e2f1fd66fef0'
      // }
    }).then(response => response.json()).then(addArticles).catch(e => requestArticleError);


    function addArticles(data) {
    let htmlContent = '';
    // const data = JSON.parse(this.responseText);
    if (data.response && data.response.docs && data.response.docs.length > 1) {
      htmlContent = '<ul className="info-ul">' + data.response.docs.map(article => 
                    `<li class="article"> 
                      <h4>
                        <a href="${article.web_url}">
                          ${article.headline.main}
                        </a>
                      </h4>
                      <p>${article.snippet}</p>
                    </li>`).join('') + '</ul>';

    } else {
      htmlContent = `No articles available`;
    }
    if (infowindow.marker !== marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div class="infowindow">' + htmlContent + '</div>');
          infowindow.open(thisMap, marker);
          infowindow.addListener('closeclick',function(){
            infowindow.marker = null;
          });
        }
  };

  function requestArticleError(e, part) {
    console.log(e);
    infowindow.setContent(`<p class="network-warning">There was an error making a request for the ${part}.</p>`);
  };
  }

class Map extends Component {

  state = {
    map: []
  }

  componentDidMount() {
    this.loadMap();
    console.log('did mount!!!');
  }

  componentDidUpdate() {
    let map;
    const { google, listData } = this.props;
    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);
    const { lat, lng, zoom } = this.props.init;
    const center = new google.maps.LatLng(lat, lng);
    const mapConfig = Object.assign({}, {
      center: center,
      zoom: zoom
    })
    map = new google.maps.Map(node, mapConfig);
    this.setMarkerAndInfo(listData, map)
    console.log('will update!!!')
  }

  loadMap() {
    const { google, originData } = this.props;
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
      this.setMarkerAndInfo(originData, map)
    }
  }

  setMarkerAndInfo = (data, thisMap) => {
    let markers = [];
    const { google, bounds } = this.props
    for (var i = 0; i < data.length; i++) {
      let marker = new google.maps.Marker({
        position: data[i].position,
        map: thisMap,
        title: data[i].title.EN,
        id: data[i].id
      });

      const largeInfowindow = new google.maps.InfoWindow();
      marker.addListener('click', function() {

        //在这里用第三方API
        
        showAPI(this, largeInfowindow,thisMap);
      });
      markers.push(marker);
    };
    thisMap.fitBounds(bounds)
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
    console.log('render~~~~~')

    return ( 
      <div ref = 'map' className = "map" id = "map"></div>
    );
  };
};

export default Map;