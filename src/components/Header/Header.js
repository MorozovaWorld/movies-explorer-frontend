import logo from '../../images/logo.svg';
import { Link, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';

function Header() {
  return (
    <Switch>
      <Route exact path={["/", "/movies", "/saved-movies"]}>
        <header className="header">
          <Link className="header__logo opacity opacity_useAt_link" to="/" >
            <img src={logo} alt="логотип сайта" />
          </Link>
          <Navigation />
        </header>
      </Route>
    </Switch>
  );
}

export default Header;