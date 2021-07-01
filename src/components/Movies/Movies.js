import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ isTabletLayout, isMobileLayout, handleSearch, isMoviesArrayNotEmpty, onCardSave, onMovieDelete, movies, isAfterFilter, onCardClick, moviesSavedData }) {
  return (
    <main className="movies">
      <SearchForm handleSearch={handleSearch} />
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
      />
      {isMoviesArrayNotEmpty && <button className="movies__more opacity opacity_useAt_button" type="button">Ещё</button>}
    </main>
  );
}

export default Movies;