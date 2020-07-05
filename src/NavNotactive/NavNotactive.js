import React, { Component } from 'react';
import './NavNotactive.css';
import { Link } from 'react-router-dom'

class NavNotactive extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Bookworm</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navTarget" aria-controls="navTarget" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navTarget">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Log In</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav >
    );
  }
}

export default NavNotactive;