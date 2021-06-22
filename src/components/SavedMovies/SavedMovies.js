import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({width, mobileBreakpoint768, mobileBreakpoint400}) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList width={width} breakpoint768={mobileBreakpoint768} breakpoint400={mobileBreakpoint400} />
    </main>
  );
}

export default SavedMovies;