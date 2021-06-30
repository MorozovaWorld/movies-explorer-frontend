import MoviesCard from '../MoviesCard/MoviesCard';
import React, { useState, useEffect } from 'react';
import { NOTHING_IS_FINDED, routesConfig } from '../../utils/constants';
import { Switch, Route } from 'react-router-dom';

function MoviesCardList({isTabletLayout, isMobileLayout, movies, moviesSavedData, onCardClick, onCardDelete, onCardSave, isMoviesArrayNotEmpty, isAfterFilter }) {

  const [moviesDisplayedList, setMoviesDisplayedList] = useState([]);
  const [savedMoviesDisplayedList, setSavedMoviesDisplayedList] = useState([]);

  const { 
    moviesUrl,
    savedMoviesUrl,
  } = routesConfig;

  console.log(savedMoviesDisplayedList)

  useEffect(() => {
    if (movies) {
      isMobileLayout && !isTabletLayout && setMoviesDisplayedList(movies.slice(0, 5));
      isTabletLayout && !isMobileLayout && setMoviesDisplayedList(movies.slice(0, 8));
      !isTabletLayout && !isMobileLayout && setMoviesDisplayedList(movies.slice(0, 16));
    }
    if (moviesSavedData) {
      isMobileLayout && !isTabletLayout && setSavedMoviesDisplayedList(moviesSavedData.slice(0, 5));
      isTabletLayout && !isMobileLayout && setSavedMoviesDisplayedList(moviesSavedData.slice(0, 8));
      !isTabletLayout && !isMobileLayout && setSavedMoviesDisplayedList(moviesSavedData.slice(0, 16));
    }
  }, [isMobileLayout, isTabletLayout, movies, moviesSavedData]);

  return (
    <section className="moviesCardList">
      <Switch>
        <Route exact path={moviesUrl}>
          {isMoviesArrayNotEmpty ?
            <ul className="moviesCardList__list">
            {
              moviesDisplayedList.map(movie =>
                <MoviesCard 
                  // imgSrc={`${'https://api.nomoreparties.co'}${movie.image.url}`}
                  key={movie.id}
                  onCardClick={onCardClick}
                  onCardSave={onCardSave}
                  onCardDelete={onCardDelete}
                  //movieTitle={movie.nameRU}
                  // movieTime={movie.duration}
                  movie={movie}
                />
              )
            }
            </ul>
          : null}
          {!isMoviesArrayNotEmpty && isAfterFilter && NOTHING_IS_FINDED}
        </Route>
        <Route path={savedMoviesUrl}>
            <ul className="moviesCardList__list">
              {
                savedMoviesDisplayedList.map(movie =>
                  <MoviesCard 
                    key={movie._id}
                    onCardClick={onCardClick}
                    onCardSave={onCardSave}
                    onCardDelete={onCardDelete}
                    movie={movie}
                  />
                )
              }
            </ul>
        </Route>
      </Switch>
    </section>
  );
}

export default MoviesCardList;