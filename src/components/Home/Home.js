import React, { Component } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import URL from '../../config';
import './Home.css';
import Pin from '../Pin/Pin';





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
      defaultZoom: 10,
      loaded: false
    }
    this.handleApiLoaded = this.handleApiLoaded.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.getLocations = this.getLocations.bind(this);
  }

  componentDidMount(){
    axios.post(URL.mapsURL).then(res => { 
      this.setState({
        location: res.data,
        lat: res.data.location.lat,
        lng: res.data.location.lng,
        accuracy: res.data.accuracy,
        defaultCenter: {
          lat: res.data.location.lat,
          lng: res.data.location.lng,
        },
        loaded: true
      })
    })
    this.getLocations()
  }

  getLocations(){
    axios.get('/api/getLocations').then(res => {
      for(var i = 0; i < res.data.length; i++){
        res.data[i].center = {
          lat: parseInt(res.data[i].lat),
          lng: parseInt(res.data[i].lng)
        }
      }
      this.setState({
        locations: res.data,
      })
      console.log(this.state.locations)
    })
  }

  addLocation(){
    let arr = this.state.locations;
    arr.push({lat: this.state.lat, lng: this.state.lng});
    this.setState({
      locations: arr
    })
  }


  handleApiLoaded(map, maps){
    let {locations} = this.state;
    
    // map through the location objects on state. Example here --> https://developers.google.com/maps/documentation/javascript/shapes#circles
    for(var i = 0; i < locations.length; i++){
      console.log(locations[i])
      const accuracyRadius = new maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: locations[i].center,
        radius: parseInt(locations[i].accuracy)
      })
    }
  }
  

  render() {
    let {defaultCenter, defaultZoom, loaded, locations} = this.state;
    
    return (
      <div id='home-container'>

        <div id='map-container'>
          {loaded ? <GoogleMapReact
            bootstrapURLKeys={{ key: URL.mapsKey }}
            center={defaultCenter}
            defaultZoom={defaultZoom}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          >
            {/* {locations.map((location, id) => {
              return <Pin key={id} lat={location.lat} lng={location.lng} />
            })} */}
          </GoogleMapReact> : <p>Loading...</p> }
          
        </div>
        
        <button id='add-location-bttn' onClick={this.addLocation} >ADD LOCATION</button>
      
      </div>
    );
  }
}


export default Home;