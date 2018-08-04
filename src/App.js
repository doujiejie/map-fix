import React, { Component } from 'react';
import './App.css';
import List from './list.js';
import GoogleAPI from './GoogleAPI.js';

class App extends Component {

    state = {
      data :[
      {
        "id":"tokyo",
        "title": {
          "CHN":"东京站",
          "JPN":"東京駅",
          "EN":"tokyo"
        },
        "map": "map",
        "positon": {
          "lat": 35.681167,
          "lng": 139.7670516
        }
      },
      {
        "id":"sinjyuku",
        "title": {
          "CHN":"新宿站",
          "JPN":"新宿駅",
          "EN":"sinjuku"
        },
        "map": "map",
        "positon": {
          "lat" : 35.6895924,
          "lng" : 139.7004131
        }
      },
      {
        "id":"ikebukuro",
        "title": {
          "CHN":"池袋站",
          "JPN":"池袋駅",
          "EN":"ikebukuro"
        },
        "map": "map",
        "positon": {
          "lat" : 35.7295028,
          "lng" : 139.7109001
        }
      },
      {
        "id":"shibuya",
        "title": {
          "CHN":"涩谷站",
          "JPN":"渋谷駅",
          "EN":"shibuya"
        },
        "map": "map",
        "positon": {
          "lat" : 35.6580339,
          "lng" : 139.7016358
        }
      },
      {
        "id":"harajyuku",
        "title": {
          "CHN":"原宿站",
          "JPN":"原宿駅",
          "EN":"harajuku"
        },
        "map": "map",
        "positon": {
          "lat" : 35.6702285,
          "lng" : 139.7026976
        }
      },
      {
        "id":"ginza",
        "title": {
          "CHN":"银座站",
          "JPN":"銀座駅",
          "EN":"ginza"
        },
        "map": "map",
        "positon": {
          "lat" : 35.6717519,
          "lng" : 139.7643082
        }
      }
      ],
      init: {
        lat: 35.7052158,
        lng: 139.7828336,
        zoom: 14
      }
    }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Street Map</h1>
        </header>
        <div className="container">
          <div className="inner">
            <List positionData={this.state.data} init={this.state.init}/>
            <GoogleAPI positionData={this.state.data} init={this.state.init}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;