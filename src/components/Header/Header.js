import logo from '../../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';
import BurgerMenu from '../BurgerMenu/BurgerMenu.js';
import React, { useState, useEffect } from 'react';

function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint768 = 768;

  const handleWindowResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.onresize = () => {
      handleWindowResize();
    }
  }, []);

  return (
    <header className="header">
    <Link className="header__logo opacity opacity_useAt_link" to="/" >
      <img src={logo} alt="логотип сайта" />
    </Link>
    <Switch>
      <Route exact path="/">
          <Navigation />
      </Route>
      <Route path={["/movies", "/saved-movies"]}>
          {width > breakpoint768 ? 
            <Navigation /> : <BurgerMenu />
          }
      </Route>
    </Switch>
    </header>
  );
}

export default Header;