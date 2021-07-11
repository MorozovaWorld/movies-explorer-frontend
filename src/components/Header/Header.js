import logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';
import BurgerMenu from '../BurgerMenu/BurgerMenu.js';
import React  from 'react';
import { routesConfig } from '../../utils/constants';

function Header({ isTabletLayout, isMobileLayout, onBurgerMenuClick, isMobileNavigationOpen }) {
  const location = useLocation();
  const locationUrl = location.pathname;

  const { 
    mainPageUrl,
    moviesUrl,
    savedMoviesUrl,
    profileUrl,
  } = routesConfig;

  return (
    <header className="header">
      {(locationUrl !== mainPageUrl && locationUrl !== moviesUrl && locationUrl !== savedMoviesUrl && locationUrl !== profileUrl) ? 
        null
      : 
        <Link className="header__logo opacity opacity_useAt_link" to="/" >
          <img src={logo} alt="логотип сайта, иконка перехода на страницу о проекте" />
        </Link>}
        {isTabletLayout || isMobileLayout ? 
        <BurgerMenu
          toggleBurgerMenuOpen={onBurgerMenuClick}
          isMobileNavigationOpen={isMobileNavigationOpen}
        /> : <Navigation />
        }
    </header>
  );
}

export default Header;