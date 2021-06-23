import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({width, mobileBreakpoint768, mobileBreakpoint400}) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList width={width} breakpoint768={mobileBreakpoint768} breakpoint400={mobileBreakpoint400} />
      <button className="movies__more opacity opacity_useAt_button" type="button">Ещё</button>
    </main>
  );
}

export default Movies;