import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ isTabletLayout, isMobileLayout, isMoviesArrayNotEmpty, onMovieDelete, moviesSavedData, onCardClick, savedMoviesFilteredData, isAfterSavedFilter, handleFilterCheckbox, handleSearch, isChecked, isFetching, isFail }) {
  
  return (
    <main className="movies">
      <SearchForm
        handleFilterCheckbox={handleFilterCheckbox}
        handleSearch={handleSearch}
        isChecked={isChecked}
      />
      <MoviesCardList
        isTabletLayout={isTabletLayout}
        isMobileLayout={isMobileLayout}
        isMoviesArrayNotEmpty={isMoviesArrayNotEmpty}
        onMovieDelete={onMovieDelete}
        onCardClick={onCardClick}
        moviesSavedData={moviesSavedData}
        savedMoviesFilteredData={savedMoviesFilteredData}
        isAfterSavedFilter={isAfterSavedFilter}
        isFetching={isFetching}
        isFail={isFail}
      />
    </main>
  );
}

export default SavedMovies;