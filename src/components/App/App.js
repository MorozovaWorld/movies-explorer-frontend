import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import '../../index.css';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';

function App() {
  return (
      <div className="body">
        <div className="page">
          <Header />
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
            <Route path="/signup">
              <Register />
            </Route>
            <Route path={["/movies", "/saved-movies"]}>
              <Movies />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
  )
}

export default App;
