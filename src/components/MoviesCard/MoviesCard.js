import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import saveIconUnclicked from '../../images/save-icon.svg';
import saveIconClicked from '../../images/save-icon-clicked.svg';
import deleteCardIcon from '../../images/delete-card-icon.svg';
import { routesConfig } from '../../utils/constants';

function MoviesCard({ imgSrc, movieTitle, movieTime }) {
  const location = useLocation();
  const locationUrl = location.pathname;

  const { 
    moviesUrl,
    savedMoviesUrl,
  } = routesConfig;
  
  const [movieSaved, setMovieSaved] = useState(false);
  const saveIcon = movieSaved ? saveIconClicked : saveIconUnclicked;

  const handleSaveClick = () => {
    if(movieSaved) {
      return setMovieSaved(false);
    }
    return setMovieSaved(true);
  };

  return (
    <li className="moviesCard">
      <img src={imgSrc} alt="постер к фильму" className="moviesCard__image" />
      <div className="moviesCard__info">
        <h2 className="moviesCard__title">{movieTitle}</h2>
        {locationUrl === moviesUrl ? 
          <button type="button" className="moviesCard__icon  opacity opacity_useAt_button" onClick={() => {handleSaveClick()}}>
            <img src={saveIcon} alt="иконка сохранения карточки фильма" className="moviesCard__save-icon" />
          </button>
        : null}
        {locationUrl === savedMoviesUrl ? 
          <button type="button" className="moviesCard__icon moviesCard__icon_display_none" onClick={() => {handleSaveClick()}}>
            <img src={deleteCardIcon} alt="иконка удаления карточки фильма из списка сохраненных" className="moviesCard__delete-icon" />
          </button>
        : null}
      </div>
      <p className="moviesCard__movieTime">{Math.floor(movieTime / 60)}ч {movieTime % 60}m</p>
    </li>
  );
}

export default MoviesCard;