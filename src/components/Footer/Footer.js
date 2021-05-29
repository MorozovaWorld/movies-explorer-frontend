import { Route, Switch } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <Switch>
        <Route exact path={["/", "/movies", "/saved-movies"]}>
          <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__info">
            <p className="footer__copyright">&copy; 2020</p>
            <nav>
              <ul className="footer__links">
                <li className="footer__link-item opacity">
                  <a href="https://www.facebook.com/icecream04/" rel='noreferrer' className="footer__link opacity opacity_useAt_link" target="_blank">Яндекс.Практикум</a>
                  </li>
                <li className="footer__link-item opacity">
                  <a href="https://github.com/MorozovaWorld" rel='noreferrer' className="footer__link opacity opacity_useAt_link" target="_blank">Github</a>
                  </li>
                <li className="footer__link-item opacity">
                  <a href="https://github.com/MorozovaWorld" rel='noreferrer' className="footer__link opacity opacity_useAt_link" target="_blank">Facebook</a>
                </li>
              </ul>
            </nav>
          </div>
        </Route>
      </Switch>
    </footer>
  );
}

export default Footer;
