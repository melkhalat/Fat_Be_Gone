import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class TabWrapper extends Component {

  
  render() {
    return (
      <div id="TabWrapper">
        <Link to="/nutrition" id="/nutrition" className="tabs">Nutrition</Link>
        <Link to="/workout" id="/workout" className="tabs">Exercise</Link>
        <Link to="/forum" id="/forum" className="tabs">Community Forum</Link>

        
      </div>
    );
  }
}

export default TabWrapper;
