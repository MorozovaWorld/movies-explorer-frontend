import React, { useState } from 'react';
import saveIconUnclicked from '../../images/save-icon.svg';
import saveIconClicked from '../../images/save-icon-clicked.svg';

function MoviesCard({ imgSrc, movieTitle, movieTime }) {
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
        <button type="button" className="moviesCard__save" onClick={() => {handleSaveClick()}}>
          <img src={saveIcon} alt="иконка сохранения" className="moviesCard__save-icon opacity opacity_useAt_button" />
        </button>
      </div>
      <p className="moviesCard__movieTime">{movieTime}</p>
    </li>
  );
}

export default MoviesCard;