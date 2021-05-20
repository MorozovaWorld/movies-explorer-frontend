function AboutMe() {
  return (
    <section className="aboutMe">
      <h2 className="aboutMe-title">Студент</h2>
      <article className="aboutMe-acticle">
        <div className="aboutMe-info">
          <div>
            <p className="aboutMe-name">Екатерина</p>
            <p className="aboutMe-about">Фронтенд-разработчик, 29 лет</p>
            <p className="aboutMe-description">В веб-разработке меня заряжает возможность помогать людям из любой точки мира решать их задачи, ведь интернет безграничен. Стараюсь ежедневно прокачивать свои навыки: слушаю подкаст «Веб-стандарты», решаю задачи на codewars.com, участвую в вебинарах и митапах Яндекс.Практикума. Интересуюсь темой цифровой доступности. Хочу создавать удобные, безопасные и эффективные приложения. Очень люблю познавать новое. Ну и прыгать с парашютом, у меня уже 150 прыжков.</p>
          </div>
          <nav>
            <ul className="aboutMe-links">
              <li className="aboutMe-link-item opacity"><a href="https://www.facebook.com/icecream04/" rel='noreferrer' className="aboutMe-link opacity opacity_useAt_link" target="_blank">Facebook</a></li>
              <li className="aboutMe-link-item opacity"><a href="https://github.com/MorozovaWorld" rel='noreferrer' className="aboutMe-link opacity opacity_useAt_link" target="_blank">Github</a></li>
            </ul>
          </nav>
        </div>
        <div className="aboutMe-photo"></div>
      </article>
    </section>
  );
}

export default AboutMe;