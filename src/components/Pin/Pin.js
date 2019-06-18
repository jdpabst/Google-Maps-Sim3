import React, { Component } from 'react';
import './Pin.css';

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
          <img src={this.props.img} alt="pin" />
          {this.props.text}
        </div>
      );
    }
  }
  
  
  export default Pin;