import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isTabletLayout, isMobileLayout, handleSearch, isMoviesArrayNotEmpty, onCardSave, onCardDelete, movies, isAfterFilter, onCardClick }) {
  return (
    <main className="movies">
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList 
        isTabletLayout={isTabletLayout}
        isMobileLayout={isMobileLayout}
        isMoviesArrayNotEmpty={isMoviesArrayNotEmpty}
        onCardClick={onCardClick}
        onCardDelete={onCardDelete}
        onCardSave={onCardSave}
        movies={movies}
        isAfterFilter={isAfterFilter}
      />
      {isMoviesArrayNotEmpty && <button className="movies__more opacity opacity_useAt_button" type="button">Ещё</button>}
    </main>
  );
}

export default Movies;