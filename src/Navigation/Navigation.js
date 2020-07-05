import React, { Component } from 'react';
import './Navigation.css';

import axios from 'axios'
import NavActive from './../NavActive/NavActive'
import NavNotactive from './../NavNotactive/NavNotactive'


class Navigation extends Component {
  state = {
    activeUser: []
  }
  // get user active 
  componentDidMount() {
    axios.get('http://localhost:3000/activeUser').then(response => {
      this.setState({ activeUser: response.data })
    })
  }
  render() {
    const { activeUser } = this.state
    const user = JSON.parse(localStorage.getItem('currentUser'))
    return (
      <div>
        {user ? <NavActive /> : <NavNotactive />}

      </div>
    );
  }
}

export default Navigation;