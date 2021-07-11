import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory, useLocation } from 'react-router-dom';

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
  SCREEN_RESOLUTION_BREAKPOINT_400,
  CONNECTION_ERR_MESSAGE
} from '../../utils/constants.js'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const { 
    mainPageUrl,
    moviesUrl,
    savedMoviesUrl,
    profileUrl,
    signUpUrl,
    singInUrl 
  } = routesConfig;

  const history = useHistory();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({name: '', email: ''});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isFetching, setFetching] = useState(false);

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
  const [savedMoviesFilteredData, setSavedMoviesFilteredData] = useState([]);
  const [moviesSavedData, setMoviesSavedData] = useState([]);

  const [isMoviesArrayNotEmpty, setMoviesArrayNotEmpty] = useState(false);
  const [isAfterFilter, setAfterFilter] = useState(false);
  const [isAfterSavedFilter, setAfterSavedFilter] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isFail, setFail] = useState(false);

  const handleWindowResize = () => setWidth(window.innerWidth);

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      Promise.all([
        mainApi.getUserInfo(jwt),
        mainApi.getSavedMovies(jwt),
      ])
      .then(([userData, savedMovies]) => {
        setLoggedIn(true);
        setCurrentUser(userData);
        setMoviesSavedData(savedMovies);

        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
        console.log(err)
      })
    } else {
      setCurrentUser({name: '', email: ''});
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    tokenCheck();
    }, []
  );

  useEffect(() => {
    if (loggedIn) {
      tokenCheck();
    }
  }, [loggedIn]);

  useEffect(() => {
    window.onresize = () => {
      handleWindowResize();
    }
  }, [width]);

  useEffect(() => {
    const localStoragedFilteredMovies = JSON.parse(localStorage.getItem("filteredMoviesArray"));

    if(localStoragedFilteredMovies) {
      if(localStoragedFilteredMovies.length > 0) {
        setMoviesArrayNotEmpty(true);
      } else {
        setMoviesArrayNotEmpty(false);
      }
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
    setFetching(true);

    mainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setFail(false);
          onSubmitSucceed(LOGIN_SUCCEED_MESSAGE);
          setLoggedIn(true);

          history.push(moviesUrl);
        }
        if (res.status === 401) {
          onSubmitFail(UNAUTHORIZED_ERR_MESSAGE);
          throw new Error(UNAUTHORIZED_ERR_MESSAGE);
        }
        if (res.status === 400) {
          onSubmitFail(BAD_REQUEST_ERR_MESSAGE);
          throw new Error(BAD_REQUEST_ERR_MESSAGE);
        }
        if (res.status === 500) {
          onSubmitFail(CONNECTION_ERR_MESSAGE);
          throw new Error(CONNECTION_ERR_MESSAGE);
        }
      })
      .catch((err) => {
        setFetching(false);
        console.log(err)
      });
  };

  const onRegister = (name, email, password) => {
    setFetching(true);

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
        if (res.status === 500) {
          onSubmitFail(CONNECTION_ERR_MESSAGE);
          throw new Error(CONNECTION_ERR_MESSAGE);
        }
        onSubmitSucceed(REGISTER_SUCCEED_MESSAGE)
        onLogin(email, password);
        setFail(false);
      })
      .catch((err) => {
        setFetching(false);
        console.log(err)
      });
  };

  const onUpdateUserInfo  = (email, name) => {
    setFetching(true);

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
        if (res.status === 500) {
          onSubmitFail(CONNECTION_ERR_MESSAGE);
          throw new Error(CONNECTION_ERR_MESSAGE);
        }
        setCurrentUser({...currentUser, name: res.name, email: res.email });
        onSubmitSucceed(USER_INFO_UPDATE_SUCCEED);

        setFail(false);
        setFetching(false);
      })
      .catch((err) => {
        setFetching(false);
        console.log(err)
      });
  }

  const onSignOut = () => {
    setMoviesFilteredData([]);
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    localStorage.removeItem('filteredMoviesArray');
    
    tokenCheck();
  };

  const moviesArrayCheck = (filteredMoviesArray) => {
    if(filteredMoviesArray.length > 0) {
      localStorage.setItem("filteredMoviesArray", JSON.stringify(filteredMoviesArray));
      setMoviesFilteredData(filteredMoviesArray);

      setFetching(false);
    } else {
      setMoviesArrayNotEmpty(false);
      setAfterFilter(true);
      setFetching(false);
    }
  }

  const moviesSavedArrayCheck = (filteredSavedMoviesArray) => {
    if(filteredSavedMoviesArray.length > 0) {

      setSavedMoviesFilteredData(filteredSavedMoviesArray);
      setFetching(false);
    } else {
      setSavedMoviesFilteredData(null)
      setAfterSavedFilter(true);
      setFetching(false);
    }
  }

  const onInitialMoviesSearch = (movie) => {
    moviesApi.getInitialContent()
    .then((res) => {
      localStorage.setItem("initialMoviesObject", JSON.stringify(res));

      handleFilter(movie, res, isChecked, moviesArrayCheck);
    })
    .catch(err => {
      setFail(true);
      console.log(err);
    });
  }

  const onSearchSubmit = (movie) => {
    setFail(false);
    setFetching(true);
    const localStoragedMovies = JSON.parse(localStorage.getItem("initialMoviesObject"));

    if(localStoragedMovies) {
      handleFilter(movie, localStoragedMovies, isChecked, moviesArrayCheck);
    } else {
      onInitialMoviesSearch(movie)
    }
  }

  const onSavedSearchSubmit = (movie) => {
    handleFilter(movie, moviesSavedData, isChecked, moviesSavedArrayCheck);
  }

  const handleCheckboxFilter = (boolean, word) => {
    setChecked(boolean);

    const mov = location.pathname === moviesUrl;
    const savedMov = location.pathname === savedMoviesUrl;
    const localStoragedFilteredMovies = JSON.parse(localStorage.getItem("filteredMoviesArray"));

    if(mov && localStoragedFilteredMovies && localStoragedFilteredMovies.length > 0) {
      if(boolean) {
        onFilterChecked(boolean, word)
      } else {
        onFilterChecked(boolean, word)
      }
    }
    else if(savedMov && moviesSavedData.length > 0) {
      if(boolean) {
        onFilterSavedChecked(boolean, word, moviesSavedData)
      } else {
        onFilterSavedChecked(boolean, word, moviesSavedData)
      }
    }
    else if(savedMov && savedMoviesFilteredData && savedMoviesFilteredData.length > 0) {
      if(boolean) {
        onFilterSavedChecked(boolean, word, savedMoviesFilteredData)
      } else {
        onFilterSavedChecked(boolean, word, savedMoviesFilteredData)
      }
    }
  }

  const onFilterChecked = (boolean, word) => {
      setFetching(true);
      const localStoragedMovies = JSON.parse(localStorage.getItem("initialMoviesObject"));

      handleFilter(word, localStoragedMovies, boolean, moviesArrayCheck);
  }

  const onFilterSavedChecked = (boolean, word, arrayToFilter) => {
      setFetching(true);
  
      handleFilter(word, arrayToFilter, boolean, moviesSavedArrayCheck);
  }

  const handleCardSave = (movie) => {
    setFail(false);

    const obj = {};

    for (let key in movie) {
      if(movie[key] === null || movie[key] === '') {
        obj[key] = 'null';
      } else {
        obj[key] = movie[key];
      };
    }

    mainApi.saveMovie(obj)
      .then((res) => {
        setMoviesSavedData([...moviesSavedData, res]);
      })
      .catch(err => {
        setFail(true);
        console.log(err);
      });
  };

  const handleMovieDelete = (movie) => {
    setFail(false);

    mainApi.deleteMovie(movie._id)
      .then(() => {
        const newMovies = moviesSavedData.filter(c => c._id !== movie._id);
        setMoviesSavedData(newMovies);

        if (savedMoviesFilteredData) {
          const newSavedMovies = savedMoviesFilteredData.filter(c => c._id !== movie._id);
          setSavedMoviesFilteredData(newSavedMovies);
        }
      })
      .catch(err => {
        setFail(true);
        console.log(err);
      })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          {
            location.pathname === mainPageUrl || location.pathname === moviesUrl || location.pathname === savedMoviesUrl || location.pathname === profileUrl ? 
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
                isFetching={isFetching}
              />
            </Route>
            <Route path={signUpUrl}>
              <Register 
                handleRegister={onRegister}
                isSubmitResultData={isSubmitResultData}
                isSubmitMessageDisplayed={isSubmitMessageDisplayed}
                setSubmitMessageDisplayed={setSubmitMessageDisplayed}
                isFetching={isFetching}
              />
            </Route>
            <ProtectedRoute 
              path={moviesUrl}
              component={Movies}
              width={width}
              handleSearch={onSearchSubmit}
              onCardSave={handleCardSave}
              isMoviesArrayNotEmpty={isMoviesArrayNotEmpty}
              isAfterFilter={isAfterFilter}
              loggedIn={loggedIn}
              isTabletLayout={isTabletLayout}
              isMobileLayout={isMobileLayout}
              moviesSavedData={moviesSavedData}
              onMovieDelete={handleMovieDelete}
              handleFilterCheckbox={handleCheckboxFilter}
              isFetching={isFetching}
              isChecked={isChecked}
              isFail={isFail}
            />
            <ProtectedRoute 
              path={savedMoviesUrl}
              component={SavedMovies}
              width={width}
              loggedIn={loggedIn}
              isTabletLayout={isTabletLayout}
              isMobileLayout={isMobileLayout}
              moviesSavedData={moviesSavedData}
              onMovieDelete={handleMovieDelete}
              handleSearch={onSavedSearchSubmit}
              savedMoviesFilteredData={savedMoviesFilteredData}
              isAfterSavedFilter={isAfterSavedFilter}
              handleFilterCheckbox={handleCheckboxFilter}
              isChecked={isChecked}
              isFetching={isFetching}
              isFail={isFail}
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
              isFetching={isFetching}
            />
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
