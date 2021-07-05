import Navigation from '../Navigation/Navigation.js';

function MobileNavigation({ isOpen, isTabletLayout, isMobileLayout, handleMobileMenuClose, handleSetDefault }) {
  return (
    <div className={'mobileNavigation' + (isOpen ? ' mobileNavigation_opened' : '')}>
      <div className="mobileNavigation__container">
        <Navigation isTabletLayout={isTabletLayout} isMobileLayout={isMobileLayout} handleMobileMenuClose={handleMobileMenuClose} handleSetDefault={handleSetDefault} />
      </div>
    </div>
  );
}

export default MobileNavigation;