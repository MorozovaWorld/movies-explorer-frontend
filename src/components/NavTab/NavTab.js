import { Link } from 'react-router-dom';

function NavTab() {
  return (
    <nav className="promo__navTab">
      <Link className="promo__navTabBtn opacity opacity_useAt_button" to="" >О проекте</Link>
      <Link className="promo__navTabBtn opacity opacity_useAt_button" to="" >Технологии</Link>
      <Link className="promo__navTabBtn opacity opacity_useAt_button" to="" >Студент</Link>
    </nav>
  );
}

export default NavTab;