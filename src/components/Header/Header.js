import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';

function Header() {
  return (
    <header className="header">
      <Link className="header__logo opacity opacity_useAt_link" to="/" >
        <img src={logo} alt="логотип сайта" />
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;