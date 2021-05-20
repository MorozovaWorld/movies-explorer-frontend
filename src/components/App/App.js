import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import '../../index.css';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';

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
            <Route path="/movies">
              <Register />
            </Route>
            <Route path="/saved-movies">
              <Register />
            </Route>
            <Route path="/profile">
              <Register />
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
  )
}

export default App;
