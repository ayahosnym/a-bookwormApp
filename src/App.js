import React from 'react';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import Navigation from './Navigation/Navigation';
import Profile from './Profile/Profile';
import Home from './Home/Home'

const currentUser = JSON.parse(localStorage.getItem('currentUser'))

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
          <Route exact path='/' component={LandingPage} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/profile' component={Profile} />
          <Route path='/home' component={Home} />
      </div>
    </BrowserRouter>
  );
}
export default App;
