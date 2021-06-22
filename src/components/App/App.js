import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import Main from '../Main/Main.js';
import '../../index.css';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import MobileNavigation from '../MobileNavigation/MobileNavigation.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';

function App( {location} ) {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [isMobileLayout, setMobileLayout] = useState(false);
  const breakpoint768 = 769;
  const breakpoint400 = 400;

  const handleWindowResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.onresize = () => {
      handleWindowResize();
    }
  }, [width]);

  useEffect(() => {
    if (width < breakpoint768) {
      setMobileLayout(true);
    } else {
      setMobileLayout(false);

      if(isMobileNavigationOpen) {
        setMobileNavigationOpen(false);
      }
    }
    
  }, [width, isMobileLayout, isMobileNavigationOpen]);

  const toggleBurgerMenuOpen = () => {
    setMobileNavigationOpen(!isMobileNavigationOpen);
  }

  return (
      <div className="body">
        <div className="page">
          {
            location.pathname !== '/signin' && location.pathname !== '/signup' ? 
            <Header 
            onBurgerMenuClick={toggleBurgerMenuOpen}
            isMobileNavigationOpen={isMobileNavigationOpen}
            isMobile={isMobileLayout}
          /> : null
          }
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
              <Movies
                width={width}
                mobileBreakpoint768={breakpoint768}
                mobileBreakpoint400={breakpoint400}
              />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
          <MobileNavigation 
            isOpen={isMobileNavigationOpen}
            isMobile={isMobileLayout}
            handleMobileMenuClose={toggleBurgerMenuOpen} />
        </div>
      </div>
  )
}

export default withRouter(App);
