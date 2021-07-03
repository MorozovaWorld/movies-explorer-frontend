import accountIcon from '../../images/account-icon.svg';
import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation({ isTabletLayout, isMobileLayout, handleMobileMenuClose }) {
  const user = React.useContext(CurrentUserContext);
  
  return (
    <>
      {user.name === '' ? 
        <nav className='navigation'>
          <Link
            className='
              navigation__navBtn
              navigation__navBtn_placedOn_landing
              opacity
              opacity_useAt_link'
            to='/signup'>Регистрация</Link>
          <Link
            className='
              navigation__navBtn
              navigation__navBtn_placedOn_landing
              navigation__navBtn_background_colored
              opacity
              opacity_useAt_button'
            to='/signin'>Войти</Link>
        </nav>
        : 
        <nav className={'navigation' + (isTabletLayout || isMobileLayout ? ' navigation_mobile' : '')}>
          <div className='navigation__main-links'>
            {isTabletLayout || isMobileLayout ? (<NavLink
              className='navigation__navBtn navigation__navBtn_mobile'
              to='/'
              onClick={handleMobileMenuClose} >Главная</NavLink>) : null}
            <NavLink
              className={'navigation__navBtn opacity opacity_useAt_link' + (isTabletLayout || isMobileLayout ? ' navigation__navBtn_mobile' : '')}
              activeClassName='navigation__navBtn_status_active'
              to='/movies'
              onClick={handleMobileMenuClose}>Фильмы</NavLink>
            <NavLink
              className={'navigation__navBtn opacity opacity_useAt_link' + (isTabletLayout || isMobileLayout ? ' navigation__navBtn_mobile' : '')}
              activeClassName='navigation__navBtn_status_active'
              to='/saved-movies'
              onClick={handleMobileMenuClose}>Сохранённые фильмы</NavLink>
          </div>
          <div
            className='navigation_account-links'>
            <NavLink
              className='
                navigation__navBtn
                navigation__navBtn_placedOn_main-mobile
                opacity
                opacity_useAt_link'
                to='/profile'
                onClick={handleMobileMenuClose}>Аккаунт</NavLink>
            <Link
              className='
                navigation__accountIcon
                opacity
                opacity_useAt_link'
              to='/profile'
              onClick={handleMobileMenuClose}><img src={accountIcon} alt='иконка перехода на страницу о проекте' /></Link>
          </div>
        </nav> 
    }
  </>
  );
}

export default Navigation;
