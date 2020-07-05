import React, { Component } from 'react';
import './NavActive.css';
import { Link } from 'react-router-dom'
import Axios from 'axios';

class NavActive extends Component {
  state = {
    activeUser: []
  }
  componentDidMount() {
    Axios.get('http://localhost:3000/activeUser').then(response => {
      console.log(response);
      this.setState({ activeUser: response.data })
    })

  }
  handelLogout = () => {
    const { activeUser } = this.state
    const id = activeUser[0].id
    localStorage.clear()
    Axios.delete('http://localhost:3000/activeUser/' + id).then(response => {
      console.log(response);
    })
  }
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
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">profile</Link>
            </li>
            <li className="nav-item">
              <Link onClick={this.handelLogout} className="nav-link" to='/'>log out</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavActive;