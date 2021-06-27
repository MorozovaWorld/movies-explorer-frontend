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
import mainApi from '../../utils/MainApi'
import moviesApi from '../../utils/MoviesApi'
import { handleFilter } from '../../utils/functions';
import {
  routesConfig,
  USER_INFO_UPDATE_SUCCEED,
  EMAIL_CONFLICT_ERR_MESSAGE,
  BAD_REQUEST_ERR_MESSAGE,
  EMAIL_NOT_FOUND_ERR_MESSAGE,
  REGISTER_SUCCEED_MESSAGE
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

  const [sumbitErrMessage, setSumbitErrMessage] = useState(''); 
  const [sumbitMessage, setSumbitMessage] = useState('');

  const [width, setWidth] = useState(window.innerWidth);
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [isMobileLayout, setMobileLayout] = useState(false);
  const [moviesFilteredData, setMoviesFilteredData] = useState([]);
  const [isMoviesArrayNotEmpty, setMoviesArrayNotEmpty] = useState(false);
  const [isAfterFilter, setAfterFilter] = useState(false);
  
  const breakpoint768 = 769;
  const breakpoint400 = 400;

  const handleWindowResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    if (loggedIn) {
      history.push(moviesUrl);
    } else {
      history.push(mainPageUrl);
    }
    }, [loggedIn, history, moviesUrl, mainPageUrl]);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      Promise.all([
        // mainApi.getContent(jwt),
        // mainApi.getInitialCards(jwt),
        mainApi.getUserInfo(jwt)
      ])
      .then(([/* userContent, initialCardsData,  */userData]) => {
        // setUserEmail(userContent.email);
        setLoggedIn(true);
        // setCards(initialCardsData);
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err))
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

  const onSubmitFail = (message) => {
    setSumbitErrMessage(message);
  }

  const onSubmitSucceed = (message) => {
    setSumbitMessage(message);
  }

  const onLogin = (email, password) => {
    mainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          tokenCheck();
        }
        if (res.status === 401) {
          onSubmitFail(EMAIL_NOT_FOUND_ERR_MESSAGE);
          throw new Error(EMAIL_NOT_FOUND_ERR_MESSAGE);
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

  const onSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
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

  const onUpdateUserInfo  = ({name, email}) => {
    mainApi.setUserInfo({name, email})
      .then((res) => {
        if (res.status === 409) {
          onSubmitFail(EMAIL_CONFLICT_ERR_MESSAGE);
          throw new Error(EMAIL_CONFLICT_ERR_MESSAGE);
        } else {
          setCurrentUser({...currentUser, name: res.name, email: res.email });
          onSubmitSucceed(USER_INFO_UPDATE_SUCCEED)
        }
      })
      .catch((err) => console.log(err));
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
              isMobile={isMobileLayout}
          /> : null
          }
          <Switch>
            <Route exact path={mainPageUrl}>
              <Main />
            </Route>
            <Route path={singInUrl}>
              <Login handleLogin={onLogin} sumbitErrMessage={sumbitErrMessage} />
            </Route>
            <Route path={signUpUrl}>
              <Register 
                handleRegister={onRegister}
                sumbitErrMessage={sumbitErrMessage}
                registerSumbitMessage={sumbitMessage}
              />
            </Route>
            <Route path={moviesUrl}>
              <Movies
                width={width}
                mobileBreakpoint768={breakpoint768}
                mobileBreakpoint400={breakpoint400}
                handleSearch={onSearchSubmit}
                movies={moviesFilteredData}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardSave}
                isMoviesArrayNotEmpty={isMoviesArrayNotEmpty}
                isAfterFilter={isAfterFilter}
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
              <Profile
                handleSignOut={onSignOut}
                handleUpdateUserInfo={onUpdateUserInfo}
                sumbitErrMessage={sumbitErrMessage}
                updateSumbitMessage={sumbitMessage}
              />
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
    </CurrentUserContext.Provider>
  )
}

export default withRouter(App);
