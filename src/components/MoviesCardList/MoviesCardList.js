import MoviesCard from '../MoviesCard/MoviesCard';
import pic1 from '../../images/pic1.jpg';
import pic2 from '../../images/pic2.jpg';
import pic3 from '../../images/pic3.jpg';
import pic4 from '../../images/pic4.jpg';
import pic5 from '../../images/pic5.jpg';
import pic6 from '../../images/pic6.jpg';
import pic7 from '../../images/pic7.jpg';
import pic8 from '../../images/pic8.jpg';
import pic9 from '../../images/pic9.jpg';
import pic10 from '../../images/pic10.jpg';
import pic11 from '../../images/pic11.jpg';
import pic12 from '../../images/pic12.jpg';
import pic13 from '../../images/pic13.jpg';
import pic14 from '../../images/pic14.jpg';
import pic15 from '../../images/pic15.jpg';
import pic16 from '../../images/pic16.jpg';
import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { routesConfig } from '../../utils/constants';

function MoviesCardList({width, breakpoint768, breakpoint400}) {
  const { 
    moviesUrl,
    savedMoviesUrl,
  } = routesConfig;

  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__list">
      <Switch>
        <Route exact path={moviesUrl}>
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

        </Route>
        <Route exact path={savedMoviesUrl}>
          <MoviesCard imgSrc={pic1} movieTitle={'33 слова о дизайне'} movieTime={'1ч42м'} />
          <MoviesCard imgSrc={pic2} movieTitle={'Киноальманах «100 лет дизайна»'} movieTime={'1ч42м'} />
          <MoviesCard imgSrc={pic3} movieTitle={'В погоне за Бенкси'} movieTime={'1ч42м'} />
        </Route>
      </Switch>
        
      </ul>
    </section>
  );
}

export default MoviesCardList;