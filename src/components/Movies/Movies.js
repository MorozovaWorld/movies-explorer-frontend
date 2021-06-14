import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { Route, Switch } from 'react-router-dom';

function Movies({width, mobileBreakpoint768, mobileBreakpoint400}) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList width={width} breakpoint768={mobileBreakpoint768} breakpoint400={mobileBreakpoint400} />
      <Switch>
        <Route exact path="/movies">
          <button className="movies__more opacity opacity_useAt_button" type="button">Ещё</button>
        </Route>
      </Switch>
    </main>
  );
}

export default Movies;