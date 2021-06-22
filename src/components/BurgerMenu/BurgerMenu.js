import { useLocation } from 'react-router-dom';

function BurgerMenu({ toggleBurgerMenuOpen, isMobileNavigationOpen }) {
  const location = useLocation();

  return (
    <>
    {(location.pathname === '*') ? 
      <button
        className={'burgerMenu__toggleBtn' + (isMobileNavigationOpen ? '  burgerMenu__toggleBtn_action_close' : '')} onClick={toggleBurgerMenuOpen}
        type="button"
      >
      <span 
        className={'burgerMenu__toggleBtn-icon' + (isMobileNavigationOpen ? '  burgerMenu__toggleBtn-icon_action_close' : '')}></span>
      </button>
    : ''}
    </>
  );
}

export default BurgerMenu;

