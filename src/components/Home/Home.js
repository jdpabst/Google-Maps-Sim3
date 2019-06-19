import React, { Component } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import URL from '../../config';
import './Home.css';
import Pin from '../Pin/Pin';
import markerImg from '../../media/star.png'





class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      locations: [{
        lat: 0,
        lng: 0
      }],
      location: '',
      lat: 0,
      lng: 0,
      accuracy: 854,
      defaultCenter: {
        lat: 40,
        lng: 620
      },
      defaultZoom: 3.5
    }
    this.handleApiLoaded = this.handleApiLoaded.bind(this);
    this.addLocation = this.addLocation.bind(this);
  }

  componentDidMount(){
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

  addLocation(){
    let arr = this.state.locations;
    arr.push({lat: this.state.lat, lng: this.state.lng});
    this.setState({
      locations: arr
    })
  }


  handleApiLoaded(map, maps, accuracy, center){
    const accuracyRadius = new maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: center,
      radius: accuracy
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
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps, accuracy, defaultCenter)}
          >
            <Pin
              lat={lat}
              lng={lng}
            />
          </GoogleMapReact>
        </div>
        
        <button id='add-location-bttn' onClick={this.addLocation} >ADD LOCATION</button>
      
      </div>
    );
  }
}


export default Home;