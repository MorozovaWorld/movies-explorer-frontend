import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search-icon.svg';

function SearchForm() {
  const [movie, setMovie] = useState('');
  
  function handleChange(e) {
    const { movie } = e.target;

    setMovie(movie);
  }

  return (
    <section className="searchForm">
      <form className="searchForm_form" name="search" onSubmit="">
        <fieldset className="searchForm__fieldset">
          <label className="searchForm__label"><img src={searchIcon} alt="иконка поиска" className="searchForm__label-icon" /></label>
          <input type="string" onChange={handleChange} name='movie' value={movie} id="movie" placeholder="Фильм" className="searchForm__input" autoComplete='off' required />
        </fieldset>
        <button type="submit" className="searchForm__button">Найти</button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;