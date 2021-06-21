import arrow from '../../images/portfolio-arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio-title">Портфолио</h2>
      <nav>
        <ul className="portfolio-links">
          <li className="portfolio-link-item opacity">
            <a href="https://github.com/MorozovaWorld/how-to-learn" rel='noreferrer' className="portfolio-link opacity opacity_useAt_link" target="_blank">Статичный сайт</a>
            <a href="https://github.com/MorozovaWorld/how-to-learn" rel='noreferrer' className="portfolio-link-arrow opacity opacity_useAt_button" target="_blank">
              <img src={arrow} alt="иконка перехода по ссылке" className="portfolio-link-arrow-icon" />
            </a>
          </li>
          <li className="portfolio-link-item opacity">
            <a href="https://github.com/https://github.com/MorozovaWorld/russian-travel" rel='noreferrer' className="portfolio-link opacity opacity_useAt_link" target="_blank">Адаптивный сайт</a>
            <a href="https://github.com/MorozovaWorld/how-to-learn" rel='noreferrer' className="portfolio-link-arrow opacity opacity_useAt_button" target="_blank">
              <img src={arrow} alt="иконка перехода по ссылке" className="portfolio-link-arrow-icon" />
            </a>
          </li>
          <li className="portfolio-link-item opacity">
            <a href="https://github.com/MorozovaWorld/react-mesto-api-full" rel='noreferrer' className="portfolio-link opacity opacity_useAt_link" target="_blank">Одностраничное приложение</a>
            <a href="https://github.com/MorozovaWorld/how-to-learn" rel='noreferrer' className="portfolio-link-arrow opacity opacity_useAt_button" target="_blank">
              <img src={arrow} alt="иконка перехода по ссылке" className="portfolio-link-arrow-icon" />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;