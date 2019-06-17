import React, { Component } from 'react';

import './Home.css';


class Home extends Component {

  render() {
    return (
      <div id='home-container'>
        <div id='map-container'></div>
        <button id='add-location-bttn'>ADD LOCATION</button>
      </div>
    );
  }
}


export default Home;