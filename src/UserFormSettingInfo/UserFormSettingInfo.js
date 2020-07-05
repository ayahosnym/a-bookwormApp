import React, { Component } from 'react';
import './UserFormSettingInfo.css';
import getInfoToKnowMatchPatternOrNot from '../Helpers/HandelChangeToMatchPattern/getInfoToKnowMatchPatternOrNot'
import axios from 'axios'

const currentUser = JSON.parse(localStorage.getItem('currentUser'))
const errorName = document.querySelector('#error-name')
const errorEmail = document.querySelector('#error-email')
const errorPassword = document.querySelector('#error-password')
const msgIfUserAlreadyExist = document.querySelector('#email-exist');

class UserFormSettingInfo extends Component {
  state = {
    users: [],
    name: '',
    email: '',
    password: '',
    newUserInfo: {
      name: "",
      email: "",
      password: "",
    },
  };
  // get all users from API to make later replace between old user info and the new info 
  componentDidMount() {
    axios.get('http://localhost:3000/users').then(response => {
      this.setState({ users: response.data })
    })
    this.setState({
      name: currentUser.name,
      email: currentUser.email,
      password: currentUser.password,
    })

  }
  // when user click on the old info  this func will  appear input field 
  handelShowInputs = (e) => {
    const penEditToShowInput = e.target.parentNode.nextElementSibling
    if (penEditToShowInput.style.display === 'none')
      penEditToShowInput.style.display = 'block'
    else {
      penEditToShowInput.style.display = 'none'
      e.target.parentNode.nextElementSibling.parentNode.nextElementSibling.style.display = "none"


    }
    console.log(e.target.parentNode.nextElementSibling.parentNode.nextElementSibling);

  }

  handelCheckValueBeforEditOnBlur = (e) => {
    const { name, value } = e.target
    const { users } = this.state

    const errorName = document.querySelector('#error-name')
    const errorEmail = document.querySelector('#error-email')
    const errorPassword = document.querySelector('#error-password')
    const msgIfUserAlreadyExist = document.querySelector('#email-exist');

    const getFormError = getInfoToKnowMatchPatternOrNot(e)

    if (name === 'name') {
      if (!getFormError.name)
        errorName.style.display = "block"

      if (getFormError.name) {
        errorName.style.display = "none"

        this.setState({ name: value })
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
          this.setState({ email: value })
        }
      }
    }
    //password
    if (name === 'password') {
      if (!getFormError.password)
        errorPassword.style.display = "block"
      if (getFormError.password) {
        errorPassword.style.display = "none"
        this.setState({ password: value })
      }
    }

  }
  // handel submit 
  handelSubmit = (e) => {
    e.preventDefault()
    // console.log(e.target.elements.name.value, e.target.elements.email.value, e.target.elements.password.value);

    const { users } = this.state
    const { name, email, password } = this.state
    const userInfo = {
      name,
      email,
      password,
    }
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))


    const findUserToEditHisData = users.find(user => user.email === currentUser.email)
    const userId = findUserToEditHisData.id
    axios.patch('http://localhost:3000/users/' + userId,
      {
        name,
        email,
        password
      }).then(response => {
        console.log(response);

      }).catch(err => {
        console.log(err);

      })

    localStorage.clear()
    localStorage.setItem('currentUser', JSON.stringify(userInfo))

    e.target.reset()

  }
  // this func to  display the part of user setting 
  //user profile page have tow parts  first one is the user fav books
  // and the second part is the user info (name , email and password ) so this func return this part
  // to display it in profile 

  EditUserData = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return (
      <div id='user-setting-info'>
        <form onSubmit={this.handelSubmit} id="form-new-user-info">
          {/* name  */}
          <div className="border-bottom">
            <p>
              {currentUser.name}
              <i className="fas fa-pen  float-right" onClick={this.handelShowInputs}></i>
            </p>
            <input
              type="text"
              placeholder="New Name...."
              name='name'
              onBlur={this.handelCheckValueBeforEditOnBlur}
              style={{ display: 'none' }}
            />
            <span className='alert alert-danger' id="error-name" role="alert">3 charcters at least </span>
          </div>
          {/* email  */}
          <div className="border-bottom">
            <p>
              {currentUser.email}
              <i className="fas fa-pen float-right" onClick={this.handelShowInputs}></i>
            </p>
            <input
              type="email"
              placeholder="New email...."
              name="email"
              onBlur={this.handelCheckValueBeforEditOnBlur}
              style={{ display: 'none' }}
            />
            <span className="alert alert-danger" id="error-email" role="alert" > Not valid email,try again</span>
            <span className="alert alert-danger" id="email-exist" role="alert" > that email is already exist! </span>
          </div>


          {/* password */}
          <div className="border-bottom">
            <p>
              {currentUser.password}
              <i className="fas fa-pen float-right" onClick={this.handelShowInputs}></i>
            </p>
            <input
              type="password"
              placeholder="New password...."
              name="password"
              onBlur={this.handelCheckValueBeforEditOnBlur}
              style={{ display: 'none' }}
            />
            <span className="alert alert-danger" id="error-password" role="alert"> minimum 6 char,must contain at least one number,one uppercase and lowercase</span>
          </div>
          <button className="save-new-info">save</button>
        </form>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.EditUserData()}
      </div>
    );
  }
}

export default UserFormSettingInfo;




