import Navigation from '../Navigation/Navigation.js';

function MobileNavigation({ isOpen, isTabletLayout, isMobileLayout, handleMobileMenuClose }) {
  return (
    <div className={'mobileNavigation' + (isOpen ? ' mobileNavigation_opened' : '')}>
      <div className="mobileNavigation__container">
        <Navigation isTabletLayout={isTabletLayout} isMobileLayout={isMobileLayout} handleMobileMenuClose={handleMobileMenuClose} />
      </div>
    </div>
  );
}

export default MobileNavigation;