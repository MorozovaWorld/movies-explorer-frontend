import { useLocation } from 'react-router-dom';
import { routesConfig } from '../../utils/constants';

function BurgerMenu({ toggleBurgerMenuOpen, isMobileNavigationOpen }) {
  const location = useLocation();
  const locationUrl = location.pathname;

  const { 
    mainPageUrl,
    moviesUrl,
    savedMoviesUrl,
    profileUrl,
  } = routesConfig;

  return (
    <>
    {(locationUrl !== mainPageUrl && locationUrl !== moviesUrl && locationUrl !== savedMoviesUrl && locationUrl !== profileUrl) ? 
      null :
      <button
        className={'burgerMenu__toggleBtn' + (isMobileNavigationOpen ? '  burgerMenu__toggleBtn_action_close' : '')} onClick={toggleBurgerMenuOpen}
        type="button"
      >
      <span 
        className={'burgerMenu__toggleBtn-icon' + (isMobileNavigationOpen ? '  burgerMenu__toggleBtn-icon_action_close' : '')}></span>
      </button>
    }
    </>
  );
}

export default BurgerMenu;

