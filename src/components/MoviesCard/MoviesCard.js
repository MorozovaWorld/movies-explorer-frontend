import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import saveIconUnclicked from '../../images/save-icon.svg';
import saveIconClicked from '../../images/save-icon-clicked.svg';
import deleteCardIcon from '../../images/delete-card-icon.svg';
import { routesConfig } from '../../utils/constants';

function MoviesCard({ movie, onCardSave }) {
  const location = useLocation();
  const locationUrl = location.pathname;

  const { 
    moviesUrl,
    savedMoviesUrl,
  } = routesConfig;
  
  const [movieSaved, setMovieSaved] = useState(false);

  // const isSaved = card.likes.some(i => i === user._id);
  const saveIcon = movieSaved ? saveIconClicked : saveIconUnclicked;

  const handleCardSave = () => {
    onCardSave({...movie});
    if(movieSaved) {
      return setMovieSaved(false);
    }
    return setMovieSaved(true);
  };

  return (
    <li className="moviesCard">
      
        {locationUrl === moviesUrl ? 
          <>
            <img src={`${'https://api.nomoreparties.co'}${movie.image.url}`} alt="постер к фильму" className="moviesCard__image" />
            <div className="moviesCard__info">
              <h2 className="moviesCard__title">{movie.nameRU}</h2>
              <button type="button" className="moviesCard__icon  opacity opacity_useAt_button" onClick={() => {handleCardSave({...movie})}}>
                <img src={saveIcon} alt="иконка сохранения карточки фильма" className="moviesCard__save-icon" />
              </button>
            </div>
          </>
        : null}
        {locationUrl === savedMoviesUrl ? 
          <>
            <img src={movie.image} alt="постер к фильму" className="moviesCard__image" />
            <div className="moviesCard__info">
              <h2 className="moviesCard__title">{movie.nameRU}</h2>
              <button type="button" className="moviesCard__icon moviesCard__icon_display_none" onClick={() => {handleCardSave()}}>
                <img src={deleteCardIcon} alt="иконка удаления карточки фильма из списка сохраненных" className="moviesCard__delete-icon" />
              </button>
            </div>
          </>
        : null}

      <p className="moviesCard__movieTime">{Math.floor(movie.duration / 60)}ч {movie.duration % 60}m</p>
    </li>
  );
}

export default MoviesCard;