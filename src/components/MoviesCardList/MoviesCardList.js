import MoviesCard from '../MoviesCard/MoviesCard';
// import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { NOTHING_IS_FINDED } from '../../utils/constants';
// import { routesConfig } from '../../utils/constants';

function MoviesCardList({ width, breakpoint768, breakpoint400, movies, onCardClick, onCardDelete, onCardLike, isMoviesArrayNotEmpty, isAfterFilter }) {
/*   const { 
    moviesUrl,
    savedMoviesUrl,
  } = routesConfig; */
  console.log(movies)

  return (
    <section className="moviesCardList">

      {isMoviesArrayNotEmpty ?
        <ul className="moviesCardList__list">
        {
          movies.map(movie => 
            <MoviesCard 
              imgSrc={`${'https://api.nomoreparties.co'}${movie.image.url}`}
              key={movie.id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              movieTitle={movie.nameRU}
              movieTime={movie.duration}
            />
          )
        }
        </ul>
      : null}

      {!isMoviesArrayNotEmpty && isAfterFilter && NOTHING_IS_FINDED}


{/* <ul className="moviesCardList__list">
      <Switch> */}
{/*         <Route exact path={moviesUrl}>
          <MoviesCard imgSrc={pic1} movieTitle={'33 слова о дизайне'} movieTime={'1ч42м'} />
          <MoviesCard imgSrc={pic2} movieTitle={'Киноальманах «100 лет дизайна»'} movieTime={'1ч42м'} />
          <MoviesCard imgSrc={pic3} movieTitle={'В погоне за Бенкси'} movieTime={'1ч42м'} />
          <MoviesCard imgSrc={pic4} movieTitle={'Баския: Взрыв реальности'} movieTime={'1ч42м'} />
          <MoviesCard imgSrc={pic5} movieTitle={'Бег это свобода'} movieTime={'1ч42м'} />
          {width > breakpoint400 ? 
            <>
              <MoviesCard imgSrc={pic6} movieTitle={'Книготорговцы'} movieTime={'1ч42м'} />
              <MoviesCard imgSrc={pic7} movieTitle={'Когда я думаю о Германии ночью'} movieTime={'1ч42м'} />
              <MoviesCard imgSrc={pic8} movieTitle={'Gimme Danger: История Игги и The Stooges'} movieTime={'1ч42м'} />
            </>
          : null}
              {width > breakpoint768 ? 
                <>
                  <MoviesCard imgSrc={pic9} movieTitle={'Дженис: Маленькая девочка грустит'} movieTime={'1ч42м'} />
                  <MoviesCard imgSrc={pic10} movieTitle={'Соберись перед прыжком'} movieTime={'1ч42м'} />
                  <MoviesCard imgSrc={pic11} movieTitle={'Пи Джей Харви: A dog called money'} movieTime={'1ч42м'} />
                  <MoviesCard imgSrc={pic12} movieTitle={'По волнам: Искусство звука в кино'} movieTime={'1ч42м'} />
                  <MoviesCard imgSrc={pic13} movieTitle={'Рудбой'} movieTime={'1ч42м'} />
                  <MoviesCard imgSrc={pic14} movieTitle={'Скейт — кухня'} movieTime={'1ч42м'} />
                  <MoviesCard imgSrc={pic15} movieTitle={'Война искусств'} movieTime={'1ч42м'} />
                  <MoviesCard imgSrc={pic16} movieTitle={'Зона'} movieTime={'1ч42м'} />
                </>
              : null }

        </Route> */}
{/*         <Route exact path={savedMoviesUrl}>
          <MoviesCard imgSrc={pic1} movieTitle={'33 слова о дизайне'} movieTime={'1ч42м'} />
          <MoviesCard imgSrc={pic2} movieTitle={'Киноальманах «100 лет дизайна»'} movieTime={'1ч42м'} />
          <MoviesCard imgSrc={pic3} movieTitle={'В погоне за Бенкси'} movieTime={'1ч42м'} />
        </Route> */}
{/*     /</Switch>
        
      </ul> */}
    </section>
  );
}

export default MoviesCardList;