import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory, Redirect } from 'react-router-dom';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
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
import mainApi from '../../utils/MainApi'
import moviesApi from '../../utils/MoviesApi'
import { handleFilter } from '../../utils/functions';
import {
  routesConfig,
  USER_INFO_UPDATE_SUCCEED,
  EMAIL_CONFLICT_ERR_MESSAGE,
  BAD_REQUEST_ERR_MESSAGE,
  UNAUTHORIZED_ERR_MESSAGE,
  REGISTER_SUCCEED_MESSAGE,
  LOGIN_SUCCEED_MESSAGE,
  SCREEN_RESOLUTION_BREAKPOINT_769,
  SCREEN_RESOLUTION_BREAKPOINT_400
} from '../../utils/constants.js'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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

  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  const [loggedIn, setLoggedIn] = useState(false);

  const [isSubmitMessageDisplayed, setSubmitMessageDisplayed] = useState(false); 
  const [isSubmitResultData, setSubmitResultData] = useState({
    submitResultMessage: '',
    submitResultMessageStyle: ''
  });

  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  const [isTabletLayout, setTabletLayout] = useState(false);
  const [isMobileLayout, setMobileLayout] = useState(false);

  const [moviesFilteredData, setMoviesFilteredData] = useState([]);
  const [isMoviesArrayNotEmpty, setMoviesArrayNotEmpty] = useState(false);
  const [isAfterFilter, setAfterFilter] = useState(false);

  const handleWindowResize = () => setWidth(window.innerWidth);

  useEffect(() => {
      if (loggedIn) {
        history.push(moviesUrl);
      }
    }, [loggedIn, history, moviesUrl]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo(jwt)
        .then((userData) => {
          setLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err))
    } else {
      setCurrentUser({name: '', email: ''});
    }
  }

  useEffect(() => {
    tokenCheck();
    }, []
  );
  
  useEffect(() => {
    window.onresize = () => {
      handleWindowResize();
    }
  }, [width]);

  useEffect(() => {
    if(moviesFilteredData.length > 0) {
      setMoviesArrayNotEmpty(true);
    } else {
      setMoviesArrayNotEmpty(false);
    }
  }, [moviesFilteredData]);

  useEffect(() => {
    if (width < SCREEN_RESOLUTION_BREAKPOINT_400) {
      setMobileLayout(true);
      setTabletLayout(false);
    }
    else if (width < SCREEN_RESOLUTION_BREAKPOINT_769 && width > SCREEN_RESOLUTION_BREAKPOINT_400) {
      setTabletLayout(true);
      setMobileLayout(false);
    } else {
      setTabletLayout(false);
      setMobileLayout(false);

      if(isMobileNavigationOpen) {
        setMobileNavigationOpen(false);
      }
    }
    
  }, [width, isMobileNavigationOpen]);

  const toggleBurgerMenuOpen = () => {
    setMobileNavigationOpen(!isMobileNavigationOpen);
  }

  const onSubmitFail = (message) => {
    setSubmitResultData({
      submitResultMessage: message,
      submitResultMessageStyle: 'fail'
    });

    setSubmitMessageDisplayed(true);
  }

  const onSubmitSucceed = (message) => {
    setSubmitResultData({
      submitResultMessage: message,
      submitResultMessageStyle: 'succeed'
    });

    setSubmitMessageDisplayed(true);
  }

  const onLogin = (email, password) => {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          onSubmitSucceed(LOGIN_SUCCEED_MESSAGE)
          setLoggedIn(true);
          tokenCheck();
        }
        if (res.status === 401) {
          onSubmitFail(UNAUTHORIZED_ERR_MESSAGE);
          throw new Error(UNAUTHORIZED_ERR_MESSAGE);
        }
        if (res.status === 400) {
          onSubmitFail(BAD_REQUEST_ERR_MESSAGE);
          throw new Error(BAD_REQUEST_ERR_MESSAGE);
        }
      })
      .catch(err => console.log(err));
  };

  const onRegister = (name, email, password) => {
    mainApi.register(name, email, password)
      .then((res) => {
        if (res.status === 400) {
          onSubmitFail(BAD_REQUEST_ERR_MESSAGE);
          throw new Error(BAD_REQUEST_ERR_MESSAGE);
        }
        if (res.status === 409) {
          onSubmitFail(EMAIL_CONFLICT_ERR_MESSAGE);
          throw new Error(EMAIL_CONFLICT_ERR_MESSAGE);
        }
        onSubmitSucceed(REGISTER_SUCCEED_MESSAGE)
        onLogin(email, password);
      })
      .catch(err => console.log(err));
  };

  const onUpdateUserInfo  = (email, name) => {
    mainApi.setUserInfo(email, name)
      .then((res) => {
        if (res.status === 409) {
          onSubmitFail(EMAIL_CONFLICT_ERR_MESSAGE);
          throw new Error(EMAIL_CONFLICT_ERR_MESSAGE);
        }
        if (res.status === 400) {
          onSubmitFail(BAD_REQUEST_ERR_MESSAGE);
          throw new Error(BAD_REQUEST_ERR_MESSAGE);
        }
        setCurrentUser({...currentUser, name: res.name, email: res.email });
        onSubmitSucceed(USER_INFO_UPDATE_SUCCEED)
      })
      .catch((err) => console.log(err));
  }

  const onSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    tokenCheck();
  };

  const moviesArrayCheck = (filteredMoviesArray) => {
    if(filteredMoviesArray.length > 0) {
      setMoviesFilteredData(filteredMoviesArray);
    } else {
      setMoviesArrayNotEmpty(false);
      setAfterFilter(true);
    }
  }

  const onInitialMoviesSearch = (movie) => {
    moviesApi.getInitialContent()
    .then((res) => {
      localStorage.setItem("initialMoviesObject", JSON.stringify(res));
      handleFilter(movie, moviesArrayCheck);
    })
    .catch(err => alert(err));
  }

  const onSearchSubmit = (movie) => {
    const localStoragedMoviesLength = localStorage.getItem("initialMoviesObject");

    if(localStoragedMoviesLength) {
      handleFilter(movie, moviesArrayCheck);
    } else {
      onInitialMoviesSearch(movie)
    }
  }

  const handleCardClick = () => {
    console.log('in onCardClick')
  };

  const handleCardDelete = () => {
    console.log('in onCardDelete')
  };

  const handleCardSave = () => {
    console.log('in onCardLike')
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {
            location.pathname !== singInUrl && location.pathname !== signUpUrl ? 
            <Header 
              onBurgerMenuClick={toggleBurgerMenuOpen}
              isMobileNavigationOpen={isMobileNavigationOpen}
              isTabletLayout={isTabletLayout}
              isMobileLayout={isMobileLayout}
          /> : null
          }
          <Switch>
            <Route exact path={mainPageUrl}>
              <Main />
            </Route>
            <Route path={singInUrl}>
              <Login
                handleLogin={onLogin}
                isSubmitResultData={isSubmitResultData}
                isSubmitMessageDisplayed={isSubmitMessageDisplayed}
                setSubmitMessageDisplayed={setSubmitMessageDisplayed}
              />
            </Route>
            <Route path={signUpUrl}>
              <Register 
                handleRegister={onRegister}
                isSubmitResultData={isSubmitResultData}
                isSubmitMessageDisplayed={isSubmitMessageDisplayed}
                setSubmitMessageDisplayed={setSubmitMessageDisplayed}
              />
            </Route>
            <ProtectedRoute 
              path={moviesUrl}
              component={Movies}
              width={width}
              handleSearch={onSearchSubmit}
              movies={moviesFilteredData}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardSave}
              isMoviesArrayNotEmpty={isMoviesArrayNotEmpty}
              isAfterFilter={isAfterFilter}
              loggedIn={loggedIn}
              isTabletLayout={isTabletLayout}
              isMobileLayout={isMobileLayout}
            />
            <ProtectedRoute 
              path={savedMoviesUrl}
              component={SavedMovies}
              width={width}
              loggedIn={loggedIn}
              isTabletLayout={isTabletLayout}
              isMobileLayout={isMobileLayout}
            />
            <ProtectedRoute 
              path={profileUrl}
              component={Profile}
              handleSignOut={onSignOut}
              handleUpdateUserInfo={onUpdateUserInfo}
              isSubmitResultData={isSubmitResultData}
              isSubmitMessageDisplayed={isSubmitMessageDisplayed}
              setSubmitMessageDisplayed={setSubmitMessageDisplayed}
              loggedIn={loggedIn}
            />
            <Route>
              {loggedIn ? <Redirect to='/' /> : <Redirect to='/signin' />}
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer />
          <MobileNavigation 
            isOpen={isMobileNavigationOpen}
            isTabletLayout={isTabletLayout}
            isMobileLayout={isMobileLayout}
            handleMobileMenuClose={toggleBurgerMenuOpen} 
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default withRouter(App);
