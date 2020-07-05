import React, { Component } from 'react';
import './UserDataSetting.css';
import axios from 'axios'

class UserDataSetting extends Component {
  state = {
    users: [],
    newUserData: {
      name: '',
      email: '',
      password: '',
    }
  };
  // get all users from API to make later  replace between old user info and the new info 
  componentDidMount() {
    axios.get('http://localhost:3000/users').then(response => {
      this.setState({ users: response.data })
    })

  }
  // when user click on the old data(info)  this func will  appear input field to let user write the new info 
  handelShowInputs = (e) => {
    const oldInfoByClickWillMakeInputAppear = e.target.nextElementSibling
    oldInfoByClickWillMakeInputAppear.style.display = 'block'
  }

  // handel change  will take value from inputs and send it to state newUserData  
  handelChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => {
      return {
        newUserData: { ...prevState.newUserData, [name]: value }
      }
    })
  }

  ///handel submit 
  // handelSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(e.target.elements.name.value, e.target.elements.email.value, e.target.elements.password.value);

  //   // const { users, newUserData } = this.state

  //   // const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  //   // const id = currentUser.id

  //   // // const findUserToEditHisData = users.find(user => user.email === currentUser.email)

  //   // axios.delete('http://localhost:3000/users/' + id)
  //   // axios.post('http://localhost:3000/users', newUserData)

  //   // axios.delete('http://localhost:3000/activeUser/' + 1)
  //   // axios.post('http://localhost:3000/activeUser', newUserData)

  //   // localStorage.clear()
  //   // localStorage.setItem('currentUser', newUserData)

  // }
  ////////////////////////////////
  // componentDidUpdate() {
  //   const { newUserData } = this.state
  //   console.log(newUserData);

  // }
  // this func to show the user info (data) and the form to let user change his info 
  EditUserData = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    return (
      <div id='form-setting'>
        <form onSubmit={this.handelSubmit} id="form-new-data"> 
          <div>
            <p onClick={this.handelShowInputs}>Name: {currentUser.name}</p>
            <input type="text" placeholder="New Name...." name='name' onChange={this.handelChange} />
          </div>
          <div>
            <p onClick={this.handelShowInputs}>Email: {currentUser.email}</p>
            <input type="email" placeholder="New email...." name="email" onChange={this.handelChange} />
          </div>
          <div>
            <p onClick={this.handelShowInputs} >Password: {currentUser.password}</p>
            <input type="password" placeholder="New password...." name="password" onChange={this.handelChange} />
          </div>
          <button>save</button>
        </form>
      </div>
    )
  }
  render() {
    return (
      <div>
        {/* <a class="fas fa-cog"></a> */}
        <span>settings</span>
        {this.EditUserData()}
      </div>
    );
  }
}

export default UserDataSetting;