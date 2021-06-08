import accountIcon from '../../images/account-icon.svg';
import { Route, Switch, Link, NavLink, useLocation } from 'react-router-dom';
import React, { useState } from 'react';

function Navigation() {
  const [moviesBtnActive, setMoviesBtnActive] = useState(true);
  const [savedMoviesBtnActive, setSavedMoviesBtnActive] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if(location.pathname === '/movies') {
      setMoviesBtnActive(true);
      setSavedMoviesBtnActive(false);
    } 
    if(location.pathname === '/saved-movies') {
      setMoviesBtnActive(false);
      setSavedMoviesBtnActive(true);
    }
  }, [location]);
  
  return (
    <nav className="header__navigation">
      <Switch>
        <Route exact path="/">
            <Link className="header__navigation-navBtn opacity opacity_useAt_link" to="/signup" >Регистрация</Link>
            <Link className="header__navigation-navBtn header__navigation-navBtn_background_colored opacity opacity_useAt_button" to="/signin" >Войти</Link>
        </Route>
        <Route path={["/movies", "/saved-movies", "/profile"]} >
          <div className="header__navigation-movies">
            <NavLink className={"header__navigation-navBtn header__navigation-navBtn_link-to_movies opacity opacity_useAt_link" + (moviesBtnActive ? ' header__navigation-navBtn_status_active' : '')}  to="/movies" >Фильмы</NavLink>
            <NavLink className={"header__navigation-navBtn header__navigation-navBtn_link-to_movies opacity opacity_useAt_link"  + (savedMoviesBtnActive ? ' header__navigation-navBtn_status_active' : '')} to="/saved-movies" >Сохранённые фильмы</NavLink>
          </div>
            <NavLink className="header__navigation-navBtn header__navigation-navBtn_link-to_account opacity opacity_useAt_link" to="/profile" >Аккаунт</NavLink>
            <Link className="header__navigation-accountIcon opacity opacity_useAt_link" to="/profile" >
              <img src={accountIcon} alt="логотип сайта" />
            </Link>
        </Route>
      </Switch>
      </nav>
  );
}

export default Navigation;