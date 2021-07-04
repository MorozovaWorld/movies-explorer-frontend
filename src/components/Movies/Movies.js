import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import React, { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader'

function Movies({ isTabletLayout, isMobileLayout, isMoviesArrayNotEmpty, onCardSave, onMovieDelete, movies, isAfterFilter, onCardClick, moviesSavedData, handleFilterCheckbox, handleSearch, isFetching, isChecked }) {
  
  const [numShowMobile, setNumShowMobile] = useState(5);
  const [numShowTablet, setNumShowTablet] = useState(8);
  const [numShow, setNumShow] = useState(16);

  const [isButtonShow, setButtonShow] = useState(false); 

  useEffect(() => {
    if(!isMobileLayout && !isTabletLayout && (movies.length > numShow)) {
      setButtonShow(true);
    } 
    else if (isMobileLayout && !isTabletLayout && (movies.length > numShowMobile)) {
      setButtonShow(true);
    }
    else if(isTabletLayout && !isMobileLayout && (movies.length > numShowTablet)) {
      setButtonShow(true);
    } else {
      setButtonShow(false);
    }
  }, [movies.length, numShow, isMobileLayout, isTabletLayout, numShowMobile, numShowTablet]);

  const handleNumShow = () => {
    setNumShow(prevCount => prevCount + 4);
    setNumShowMobile(prevCount => prevCount + 2);
    setNumShowTablet(prevCount => prevCount + 2);
  }

  const onSearchSubmit = () => {
    setNumShow(16);
    setNumShowMobile(5);
    setNumShowTablet(8);
  }

  return (
    <main className="movies">
      <SearchForm 
        handleFilterCheckbox={handleFilterCheckbox}
        handleSearch={handleSearch}
        handleNumShowSetInitial={onSearchSubmit}
        isChecked={isChecked}
      />
      {
        isFetching ? <Preloader /> :
          <>
            <MoviesCardList 
              isTabletLayout={isTabletLayout}
              isMobileLayout={isMobileLayout}
              isMoviesArrayNotEmpty={isMoviesArrayNotEmpty}
              onCardClick={onCardClick}
              onCardSave={onCardSave}
              movies={movies}
              isAfterFilter={isAfterFilter}
              moviesSavedData={moviesSavedData}
              onMovieDelete={onMovieDelete}
              numShowMobile={numShowMobile}
              numShowTablet={numShowTablet}
              numShow={numShow}
            />
            {isMoviesArrayNotEmpty && isButtonShow && <button className="movies__more opacity opacity_useAt_button" type="button" onClick={handleNumShow} >Ещё</button>}
          </>
      }
    </main>
  );
}

export default Movies;