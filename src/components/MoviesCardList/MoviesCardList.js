import MoviesCard from '../MoviesCard/MoviesCard';
import React, { useState, useEffect } from 'react';
import { NOTHING_IS_FINDED } from '../../utils/constants';

function MoviesCardList({isTabletLayout, isMobileLayout, movies, onCardClick, onCardDelete, onCardLike, isMoviesArrayNotEmpty, isAfterFilter }) {

  const [moviesDisplayedList, setMoviesDisplayedList] = useState([]);
  
  useEffect(() => {
    if (movies) {
      isMobileLayout && !isTabletLayout && setMoviesDisplayedList(movies.slice(0, 5));
      isTabletLayout && !isMobileLayout && setMoviesDisplayedList(movies.slice(0, 8));
      !isTabletLayout && !isMobileLayout && setMoviesDisplayedList(movies.slice(0, 16));
    }
  }, [isMobileLayout, isTabletLayout, movies]);

  return (
    <section className="moviesCardList">

      {isMoviesArrayNotEmpty ?
        <ul className="moviesCardList__list">
        {
          moviesDisplayedList.map(movie => 
            <MoviesCard 
              imgSrc={`${'https://api.nomoreparties.co'}${movie.image.url}`}
              key={movie.id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              movieTitle={movie.nameRU}
              movieTime={movie.duration}
            />
          )
        }
        </ul>
      : null}
      {!isMoviesArrayNotEmpty && isAfterFilter && NOTHING_IS_FINDED}
    </section>
  );
}

export default MoviesCardList;