import React, { Component } from 'react';
import './Pin.css';
import pin from '../../media/icon.png'

class Pin extends Component {
  
    render() {
      return (
        <div id='pin-container' style={{
            padding: '15px 10px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)'
          }}>
            <img src={pin} alt='map marker'/>
        </div>
      );
    }
  }
  
  
  export default Pin;