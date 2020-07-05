import React, { Component } from 'react';
import './LogIn.css';
import { Link } from 'react-router-dom'
import axios from 'axios'

class LogIn extends Component {
  state = {
    users: [],
    userData: {},
    isValid: true,

  }
  componentDidMount() {
    axios.get('http://localhost:3000/users').then(response => {
      this.setState({
        users: response.data
      })
    })

  }
  handelSubmit = (e) => {
    console.log(e.target);
    const { userData } = this.state
    userData.favBooks = [];
    localStorage.setItem("currentUser", JSON.stringify(userData));
    axios.post('http://localhost:3000/activeUser', userData).then(response => {
      console.log(response);

    })
    this.props.history.push('home');
    e.target.reset()

  }
  handelCheckBeforLogin = (e) => {
    const { users } = this.state
    const { name, value } = e.target
    const msgEmailNotExist = document.querySelector('#email-not-exist');
    const msgPasswordWrong = document.querySelector('#password-wrong');
    let userExist;

    if (name === 'email') {
      userExist = users.find(user => user.email === value)
      if (!userExist) {
        msgEmailNotExist.style.display = 'block'
      } else {
        this.setState({ userData: userExist })
        msgEmailNotExist.style.display = 'none'
      }
    }

    const { userData } = this.state

    if (name === 'password') {
      if (userData.password === value) {
        this.setState({ isValid: false })
        msgPasswordWrong.style.display = 'none'
      } else {
        msgPasswordWrong.style.display = 'block'
      }
    }

  }
  render() {
    return (
      <section className="login">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="login-box">
                <h2 className="pt-4 pb-4">Login.....</h2>
                <form onSubmit={this.handelSubmit}>
                  <p>
                    <input
                      placeholder="Your Email"
                      name='email'
                      onBlur={this.handelCheckBeforLogin}
                    />
                  </p>
                  <div className="alert alert-danger" id="email-not-exist" role="alert" > Not valid Email try another </div>
                  <p>
                    <input
                      placeholder="Your Password"
                      type="password"
                      name='password'
                      onBlur={this.handelCheckBeforLogin}
                    />
                  </p>
                  <div className="alert alert-danger" id="password-wrong" role="alert" > wrong password,try again </div>
                  <button disabled={this.state.isValid}>log</button>
                  <div className="donot-have-account">
                    <p>Do not have an account ? <Link to="signup">Register</Link></p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LogIn;