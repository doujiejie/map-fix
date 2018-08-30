import React, { Component } from 'react';
import './App.css';
import List from './List.js';
import GoogleAPI from './GoogleAPI.js';
// import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class App extends Component {

  state = {
    query:"",
    data: [{
        "id": "tokyo",
        "title": {
          "CHN": "东京站",
          "JPN": "東京駅",
          "EN": "tokyo station"
        },
        "map": "",
        "position": {
          "lat": 35.681167,
          "lng": 139.7670516
        }
      },
      {
        "id": "sinjyuku",
        "title": {
          "CHN": "新宿站",
          "JPN": "新宿駅",
          "EN": "sinjuku station"
        },
        "map": "",
        "position": {
          "lat": 35.6895924,
          "lng": 139.7004131
        }
      },
      {
        "id": "ikebukuro",
        "title": {
          "CHN": "池袋站",
          "JPN": "池袋駅",
          "EN": "ikebukuro station"
        },
        "map": "",
        "position": {
          "lat": 35.7295028,
          "lng": 139.7109001
        }
      },
      {
        "id": "shibuya",
        "title": {
          "CHN": "涩谷站",
          "JPN": "渋谷駅",
          "EN": "shibuya station"
        },
        "map": "",
        "position": {
          "lat": 35.6580339,
          "lng": 139.7016358
        }
      },
      {
        "id": "harajyuku",
        "title": {
          "CHN": "原宿站",
          "JPN": "原宿駅",
          "EN": "harajuku station"
        },
        "map": "",
        "position": {
          "lat": 35.6702285,
          "lng": 139.7026976
        }
      },
      {
        "id": "ginza",
        "title": {
          "CHN": "银座站",
          "JPN": "銀座駅",
          "EN": "ginza station"
        },
        "map": "",
        "position": {
          "lat": 35.6717519,
          "lng": 139.7643082
        }
      }
    ],
    init: {
      lat: 35.7052158,
      lng: 139.7828336,
      zoom: 13
    },
    listData:[]
  }

  updateQuery = (query,originData) => {
    var dataInList;
    const match = new RegExp(escapeRegExp(query), 'i');

    if (query!=="") {
      dataInList = originData.filter(
        (data) => match.test(data.title.EN+data.title.CHN+data.title.JPN));
      this.setState({
        listData: dataInList
      })
    } 
    else {
      this.setState({
        listData: originData
      })
    }
      this.setState({
      query: query.trim(),
      })
    }


  showAPI = (marker, infowindow,thisMap) => {
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
                      <h5>
                        <a role="link" tabIndex="0" href="${article.web_url}">
                          ${article.headline.main}
                        </a>
                      </h5>
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

  render() {
    return ( 
      <div className = "App" >
        <header className = "App-header" >
          <div className = "menu">☰</div>
          <h1 className = "App-title" aria-label="Street Map"> Street Map </h1>
        </header> 
        <div className = "container" >
          <div className = "inner" >
            <List 
            originData = { this.state.data }
            listData = {this.state.listData} 
            init = { this.state.init } 
            query = {this.state.query}
            updateQuery = {this.updateQuery}
            clearQuery = {this.clearQuery}
            showAPI = {this.showAPI}
            />
            <GoogleAPI 
            originData = { this.state.data } 
            init = { this.state.init } 
            query = {this.state.query}
            listData = {this.state.listData}
            updateQuery={this.updateQuery}
            clearQuery={this.clearQuery}
            showWiki={this.showWiki}
            showAPI = {this.showAPI}
            /> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;