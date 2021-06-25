import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({width, mobileBreakpoint768, mobileBreakpoint400, handleSearch, isMoviesArrayNotEmpty, onCardLike, onCardDelete, movies, isAfterFilter}) {
  return (
    <main className="movies">
      <SearchForm handleSearch={handleSearch} />
      <MoviesCardList 
        width={width}
        breakpoint768={mobileBreakpoint768}
        breakpoint400={mobileBreakpoint400}
        isMoviesArrayNotEmpty={isMoviesArrayNotEmpty}
        onCardClick={onCardLike}
        onCardDelete={onCardDelete}
        onCardLike={onCardLike}
        movies={movies}
        isAfterFilter={isAfterFilter}
      />
      <button className="movies__more opacity opacity_useAt_button" type="button">Ещё</button>
    </main>
  );
}

export default Movies;