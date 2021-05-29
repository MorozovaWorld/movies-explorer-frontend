import accountIcon from '../../images/account-icon.svg';
import { Route, Switch, Link, NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="header__navigation">
      <Switch>
        <Route exact path="/">
            <Link className="header__navigation-navBtn opacity opacity_useAt_link" to="/signup" >Регистрация</Link>
            <Link className="header__navigation-navBtn header__navigation-navBtn_background_colored opacity opacity_useAt_button" to="/signin" >Войти</Link>
        </Route>
        <Route path={["/movies", "/saved-movies", "/profile"]} >
          <div className="header__navigation-movies">
            <NavLink className="header__navigation-navBtn opacity opacity_useAt_link" to="/movies" >Фильмы</NavLink>
            <NavLink className="header__navigation-navBtn header__navigation-navBtn_wight_400 opacity opacity_useAt_link" to="/saved-movies" >Сохранённые фильмы</NavLink>
          </div>
            <NavLink className="header__navigation-navBtn opacity opacity_useAt_link" to="/profile" >Аккаунт</NavLink>
            <Link className="header__navigation-accountIcon opacity opacity_useAt_link" to="/profile" >
              <img src={accountIcon} alt="логотип сайта" />
            </Link>
        </Route>
      </Switch>
      </nav>
  );
}

export default Navigation;