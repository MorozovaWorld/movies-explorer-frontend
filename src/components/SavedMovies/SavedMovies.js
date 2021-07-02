import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ isTabletLayout, isMobileLayout, handleSearch, isMoviesArrayNotEmpty, onMovieDelete, moviesSavedData, isAfterFilter, onCardClick, savedMoviesFilteredData, isAfterSavedFilter }) {

  return (
    <main className="movies">
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList
        isTabletLayout={isTabletLayout}
        isMobileLayout={isMobileLayout}
        isMoviesArrayNotEmpty={isMoviesArrayNotEmpty}
        onMovieDelete={onMovieDelete}
        onCardClick={onCardClick}
        moviesSavedData={moviesSavedData}
        savedMoviesFilteredData={savedMoviesFilteredData}
        isAfterSavedFilter={isAfterSavedFilter}
      />
    </main>
  );
}

export default SavedMovies;