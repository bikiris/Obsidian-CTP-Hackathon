import React, { Component } from 'react';
import './style.css';

function getMessage() {
  fetch('/api/message', { 
    method: 'GET'
  }).then(function(response) { return response.json(); })
  .then(function(json) {
    // use the json
    
    document.getElementsByClassName('message')[0].innerText = json.message;
    
  });
  
}

class Home extends Component {
  render() {
    return (
      <>
        <h1>Home</h1>
        <p>Home</p>
        <button onClick={getMessage}>Click Me</button>
        <div className="message"> </div>
      </>
    )
  }
}

export default Home;