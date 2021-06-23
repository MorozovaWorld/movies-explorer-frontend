import React, { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import searchIcon from '../../images/search-icon.svg';

function SearchForm() {
  const [movie, setMovie] = useState('');
  
  function handleChange(e) {
    setMovie(e.target.value);
  }

  return (
    <section className="searchForm">
      <form className="searchForm_form" name="search">
        <fieldset className="searchForm__fieldset">
          <label className="searchForm__label" htmlFor="movie"><img src={searchIcon} alt="иконка поиска фильма" className="searchForm__label-icon" /></label>
          <input type="string" onChange={handleChange} name='movie' value={movie} id="movie" placeholder="Фильм" className="searchForm__input" autoComplete='off' required />
        </fieldset>
        <button type="submit" className="searchForm__button opacity opacity_useAt_button">Найти</button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;