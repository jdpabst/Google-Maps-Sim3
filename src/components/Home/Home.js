import React, { Component } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import URL from '../../config';
import './Home.css';
import Pin from '../Pin/Pin';
import markerImg from '../../media/star.png'

const AnyReactComponent = ({ img }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    <img src={img}/>
  </div>
);


class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      location: '',
      lat: 0,
      lng: 0,
      accuracy: 0,
      defaultCenter: {
        lat: 40.76,
        lng: -111.89
      },
      defaultZoom: 4
    }
    this.getGeolocation = this.getGeolocation.bind(this);
  }

  getGeolocation(){
    axios.post(URL.mapsURL).then(res => { 
      console.log(res.data)
      this.setState({
        location: res.data,
        lat: res.data.location.lat,
        lng: res.data.location.lng,
        accuracy: res.data.accuracy,
        defaultCenter: {
          lat: res.data.location.lat,
          lng: res.data.location.lng,
        },
      })
    })
  }

  render() {
    let {lat, lng, accuracy, defaultCenter, defaultZoom} = this.state;
    return (
      <div id='home-container'>
        <div id='map-container'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: URL.mapsKey }}
            center={defaultCenter}
            defaultZoom={defaultZoom}
          >
            <Pin
              lat={lat}
              lng={lng}
              img={markerImg}
            />
          </GoogleMapReact>
        </div>
        <button id='add-location-bttn' onClick={this.getGeolocation} >ADD LOCATION</button>
      
      </div>
    );
  }
}


export default Home;