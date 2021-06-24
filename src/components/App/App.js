import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';

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
import SavedMovies from '../SavedMovies/SavedMovies';
import { routesConfig } from '../../utils/constants';
import moviesApi from '../../utils/MoviesApi'

function App( {location} ) {
  const { 
    mainPageUrl,
    moviesUrl,
    savedMoviesUrl,
    profileUrl,
    signUpUrl,
    singInUrl 
  } = routesConfig;

  const history = useHistory(); 

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

  const onLogin = (email, password) => {
    history.push(moviesUrl);
  };

  const onRegister = (name, email, password) => {
    history.push(singInUrl);
  };

  const onInitialMoviesSearch = (movie) => {
    moviesApi.getInitialContent(movie)
      .then((res) => {
        localStorage.setItem("initialMoviesObject", JSON.stringify(res));
      })
      .catch(err => console.log(err));
  };

  return (
      <div className="body">
        <div className="page">
          {
            location.pathname !== singInUrl && location.pathname !== signUpUrl ? 
            <Header 
              onBurgerMenuClick={toggleBurgerMenuOpen}
              isMobileNavigationOpen={isMobileNavigationOpen}
              isMobile={isMobileLayout}
          /> : null
          }
          <Switch>
            <Route exact path={mainPageUrl}>
              <Main />
            </Route>
            <Route path={singInUrl}>
              <Login handleLogin={onLogin}/>
            </Route>
            <Route path={signUpUrl}>
              <Register handleRegister={onRegister}/>
            </Route>
            <Route path={moviesUrl}>
              <Movies
                width={width}
                mobileBreakpoint768={breakpoint768}
                mobileBreakpoint400={breakpoint400}
                handleSearch={onInitialMoviesSearch}
              />
            </Route>
            <Route path={savedMoviesUrl}>
              <SavedMovies
                width={width}
                mobileBreakpoint768={breakpoint768}
                mobileBreakpoint400={breakpoint400}
              />
            </Route>
            <Route path={profileUrl}>
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
