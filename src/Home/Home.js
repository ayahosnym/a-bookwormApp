import React, { Component } from 'react';
import './Home.css';
import Books from './../Books/Books'
import axiox from 'axios'

class Home extends Component {

  state = {
    books: []
  }
  componentDidMount() {
    axiox.get('http://localhost:3000/books').then(response => {
      this.setState({ books: response.data })
      console.log(response.data);
    })
  }
  render() {
    return (
      <div>
        <Books books={this.state.books} />
      </div>
    );
  }
}

export default Home;