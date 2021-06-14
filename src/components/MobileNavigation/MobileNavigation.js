import Navigation from '../Navigation/Navigation.js';

function MobileNavigation({ isOpen, isMobile, handleMobileMenuClose }) {
  return (
    <div className={'mobileNavigation' + (isOpen ? ' mobileNavigation_opened' : '')}>
      <div className="mobileNavigation__container">
        <Navigation isMobile={isMobile} handleMobileMenuClose={handleMobileMenuClose} />
      </div>
    </div>
  );
}

export default MobileNavigation;