import React, { useState, useEffect } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search-icon.svg';
import { isSearchWordNeededErrMessage } from '../../utils/constants'

function SearchForm() {
  const [movie, setMovie] = useState('');
  const [isValid, setIsValid] = React.useState(true);
  const [isErrDisplayed, setErrDisplayed] = React.useState(false);
  
  function handleChange(e) {
    setMovie(e.target.value);
  }

    // валидация строки поиска, проверка наличия ключевого слова
    useEffect(function validateInputs() {
      if(movie.match(/^[.\S]/giu)) {
        setIsValid(true);
        setErrDisplayed(false);
      } else {
        setIsValid(false)
      }
    }, [movie]);

  function handleSubmit(e) {
    e.preventDefault();

    if(isValid) {

      // handleSearch(movie);

    } else {
      setErrDisplayed(true);
    }
  }

  return (
    <section className="searchForm" onSubmit={handleSubmit}>
      <form className="searchForm_form" name="search">
        <fieldset className="searchForm__fieldset">
          <label className="searchForm__label" htmlFor="movie"><img src={searchIcon} alt="иконка поиска фильма" className="searchForm__label-icon" /></label>
          <input type="string" onChange={handleChange} name='movie' value={movie} id="movie" placeholder="Фильм" className="searchForm__input" autoComplete='off' />
          <span id="search-error" className="formPage__input-error formPage__input-error_location_movie-search">
            {isErrDisplayed && isSearchWordNeededErrMessage}
          </span>
        </fieldset>
        <button type="submit" className="searchForm__button opacity opacity_useAt_button">Найти</button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;