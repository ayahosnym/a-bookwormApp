import React, { Component } from 'react';
import './LandingPage.css';

class LandingPage extends Component {
  // constructor(props){
  // super(props);
  // this.state = {};
  // }

  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillUnmount(){}

  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}

  render() {
    return (
      <section className="landing-page d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-2 mb-3">
              <i className="fas fa-book-reader fa-3x" ></i>
            </div>
            <div className="col-12 text-capitalize text-center">
              <h2>BookWorm app ... </h2>
              <span className="border-bottom"><i></i></span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LandingPage;