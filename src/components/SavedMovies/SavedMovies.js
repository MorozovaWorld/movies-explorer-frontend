import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ isTabletLayout, isMobileLayout, handleSearch, isMoviesArrayNotEmpty, onCardDelete, moviesSavedData, isAfterFilter, onCardClick }) {

  return (
    <main className="movies">
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList
        isTabletLayout={isTabletLayout}
        isMobileLayout={isMobileLayout}
        isMoviesArrayNotEmpty={isMoviesArrayNotEmpty}
        onCardDelete={onCardDelete}
        onCardClick={onCardClick}
        moviesSavedData={moviesSavedData}
        isAfterFilter={isAfterFilter}
      />
    </main>
  );
}

export default SavedMovies;