import React, { Component } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import getInfoToKnowMatchPatternOrNot from '../Helpers/HandelChangeToMatchPattern/getInfoToKnowMatchPatternOrNot'
import axios from 'axios';

class SignUp extends Component {

  state = {
    users: [],
    userInfo: {
      name: "",
      email: "",
      password: "",
    },
    isValid: false,
  }

  //  get all users  from API  
  componentDidMount() {
    axios.get('http://localhost:3000/users').then(response => {
      this.setState({
        users: response.data
      })
    })

  }
  handelSubmit = (e) => {
    e.preventDefault()
    const { userInfo } = this.state
    userInfo.favBooks = []

    localStorage.setItem("currentUser", JSON.stringify(userInfo));

    axios.post('http://localhost:3000/activeUser', userInfo).then(response => {
      console.log(response);
    })
    axios.post('http://localhost:3000/users', userInfo).then(response => {
      console.log(response);
    })

    this.props.history.push('./Home/Home.js');

    e.target.reset()
  }

  handelCheckMatchValueOnBlur = (e) => {
    const { name, value } = e.target
    const { users } = this.state
    const getFormError = getInfoToKnowMatchPatternOrNot(e)

    // element msg that will appere when user data not match the pattern
    const errorName = document.querySelector('#error-name')
    const errorEmail = document.querySelector('#error-email')
    const errorPassword = document.querySelector('#error-password')
    const msgIfUserAlreadyExist = document.querySelector('#email-exist');

    if (name === 'name') {
      if (!getFormError.name)
        errorName.style.display = "block"

      if (getFormError.name) {
        errorName.style.display = "none"
        this.setState(prevState => {
          return {
            userInfo: { ...prevState.userInfo, [name]: value }
          }
        })
      }
    }
    // email
    if (name === 'email') {
      if (!getFormError.email)
        errorEmail.style.display = "block"

      if (getFormError.email) {
        errorEmail.style.display = "none"
        // check if user is already exist or not  by email 
        // cuz it exist show mssage to let him go to log in instead register or sign in with a new email 
        const user = users.find(user => user.email === value);

        if (user && user.email === value) {
          msgIfUserAlreadyExist.style.display = 'block'
        } else {
          msgIfUserAlreadyExist.style.display = 'none'
          this.setState(prevState => {
            return {
              userInfo: { ...prevState.userInfo, [name]: value }
            }
          })
        }
      }
    }

    //password
    if (name === 'password') {
      if (!getFormError.password)
        errorPassword.style.display = "block"
      if (getFormError.password) {
        errorPassword.style.display = "none"
        this.setState(prevState => {
          return {
            userInfo: { ...prevState.userInfo, [name]: value }
          }
        })
      }
    }

  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.userInfo !== this.state.userInfo) {
      if (Object.values(this.state.userInfo).every(value => value !== '')) {
        this.setState({
          isValid: true
        })
      }
    }
  }
  render() {
    return (
      <section className="register" >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="register-box">
                <h2 className="pt-4 pb-4">Create Account</h2>
                <form onSubmit={this.handelSubmit}>
                  <p>
                    {/* user Name */}
                    <input
                      placeholder="Enter Your Name"
                      type='text'
                      name="name"
                      onChange={this.handelChange}
                      onBlur={this.handelCheckMatchValueOnBlur}
                      required
                    />
                  </p>
                  <div className='alert alert-danger' id="error-name" role="alert">name must be at least 3 characters</div>
                  <p>
                    {/* user Email*/}
                    <input
                      placeholder="Your Email"
                      type='text'
                      name='email'
                      onBlur={this.handelCheckMatchValueOnBlur}
                      required
                      onChange={this.handelChange}
                    />
                  </p>
                  <div className="alert alert-danger" id="error-email" role="alert" > Not valid email,try again</div>
                  <div className="alert alert-danger" id="email-exist" role="alert" > that email is already exist! </div>
                  <p>
                    {/*user Password */}
                    <input
                      type="password"
                      placeholder="Your Password"
                      name='password'
                      onBlur={this.handelCheckMatchValueOnBlur}
                      onChange={this.handelChange}
                      required />
                  </p>
                  <div className="alert alert-danger" id="error-password" role="alert">Password length minemum 6 characters,must contain at least one number,one uppercase and lowercase letter.</div>
                  <button disabled={!this.state.isValid}>submit</button>
                </form>
                <div className="have-account">
                  <p >Already have an account ?  <Link to='login' >Login</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default SignUp;