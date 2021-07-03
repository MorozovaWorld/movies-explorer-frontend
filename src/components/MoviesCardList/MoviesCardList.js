import MoviesCard from '../MoviesCard/MoviesCard';
import React, { useState, useEffect, useCallback } from 'react';
import { NOTHING_IS_FINDED, routesConfig } from '../../utils/constants';
import { Switch, Route } from 'react-router-dom';

function MoviesCardList({
    isTabletLayout,
    isMobileLayout,
    movies,
    moviesSavedData,
    onCardClick,
    onMovieDelete,
    onCardSave,
    isMoviesArrayNotEmpty, 
    savedMoviesFilteredData,
    isAfterFilter,
    isAfterSavedFilter,
    onImageClick,
    numShow,
    numShowTablet,
    numShowMobile
  })
{
  const [moviesDisplayedList, setMoviesDisplayedList] = useState([]);
  const [savedMoviesDisplayedList, setSavedMoviesDisplayedList] = useState([]);

  const { 
    moviesUrl,
    savedMoviesUrl,
  } = routesConfig;

  const handleSetMoviesDisplayed = useCallback((mov, setterFunction) => {
    isMobileLayout && !isTabletLayout && setterFunction(mov.slice(0, numShowMobile));
    isTabletLayout && !isMobileLayout && setterFunction(mov.slice(0, numShowTablet));
    !isTabletLayout && !isMobileLayout && setterFunction(mov.slice(0, numShow));
  }, [isMobileLayout, isTabletLayout, numShowTablet, numShow, numShowMobile])

  const handleSetSavedMoviesDisplayed = useCallback((movSaved, setterFunction) => {
    isMobileLayout && !isTabletLayout && setterFunction(movSaved);
    isTabletLayout && !isMobileLayout && setterFunction(movSaved);
    !isTabletLayout && !isMobileLayout && setterFunction(movSaved);
  }, [isMobileLayout, isTabletLayout])

  useEffect(() => {
    movies && handleSetMoviesDisplayed(movies, setMoviesDisplayedList);
    moviesSavedData && handleSetSavedMoviesDisplayed(moviesSavedData, setSavedMoviesDisplayedList);
    savedMoviesFilteredData && savedMoviesFilteredData.length > 0 && handleSetSavedMoviesDisplayed(savedMoviesFilteredData, setSavedMoviesDisplayedList);
  },[handleSetMoviesDisplayed, movies, moviesSavedData, savedMoviesFilteredData, handleSetSavedMoviesDisplayed]);


  return (
    <section className="moviesCardList">
      <Switch>
        <Route exact path={moviesUrl}>
          {isMoviesArrayNotEmpty ?
            <ul className="moviesCardList__list">
            {
              moviesDisplayedList.map(movie =>
                <MoviesCard 
                  key={movie.id}
                  onCardClick={onCardClick}
                  onCardSave={onCardSave}
                  onMovieDelete={onMovieDelete}
                  movie={movie}
                  moviesSavedData={moviesSavedData}
                  onImageClick={onImageClick}
                />
              )
            }
            </ul>
          : null}
          {!isMoviesArrayNotEmpty && isAfterFilter && NOTHING_IS_FINDED}
        </Route>
        <Route path={savedMoviesUrl}>
          { ((!savedMoviesFilteredData) && isAfterSavedFilter) ?
            NOTHING_IS_FINDED :
            <ul className="moviesCardList__list">
              {
                savedMoviesDisplayedList.map(movie =>
                  <MoviesCard 
                    key={movie._id}
                    onCardClick={onCardClick}
                    onCardSave={onCardSave}
                    onMovieDelete={onMovieDelete}
                    movie={movie}
                    onImageClick={onImageClick}
                  />
                )
              }
            </ul>
          }
        </Route>
      </Switch>
    </section>
  );
}

export default MoviesCardList;