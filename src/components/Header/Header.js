import logo from '../../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';
import BurgerMenu from '../BurgerMenu/BurgerMenu.js';
import React  from 'react';

function Header({ isMobile, onBurgerMenuClick, isMobileNavigationOpen }) {
  return (
    <header className="header">
    <Link className="header__logo opacity opacity_useAt_link" to="/" >
      <img src={logo} alt="логотип сайта, иконка перехода на страницу о проекте" />
    </Link>
    <Switch>
      <Route exact path="/">
          <Navigation />
      </Route>
      <Route path={["/", "/movies", "/saved-movies"]}>
        {!isMobile ? <Navigation/> : 
          <BurgerMenu
            toggleBurgerMenuOpen={onBurgerMenuClick}
            isMobileNavigationOpen={isMobileNavigationOpen}
          />
        }
      </Route>
    </Switch>
    </header>
  );
}

export default Header;