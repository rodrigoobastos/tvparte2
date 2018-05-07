import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <LoginPage/>
          <Link to= "/signup" className="medium ui button">Sign Up</Link>
        </div>
      </div>
    );
  }
}

export default App;
