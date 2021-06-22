function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <h2 className="aboutProject-title">О проекте</h2>
      <div className="aboutProject-infoBlock">
        <article className="aboutProject-description">
          <p className="aboutProject-subtitle">
            Дипломный проект включал 5 этапов
          </p>
          <p className="aboutProject-text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </article>
        <article className="aboutProject-description">
          <p className="aboutProject-subtitle">
            На выполнение диплома ушло 5 недель
          </p>
          <p className="aboutProject-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className="aboutProject-graph">
          <p className="aboutProject-graph-text aboutProject-graph-text_area_backWeeks">
            1 неделя
          </p>
          <p className="aboutProject-graph-text aboutProject-graph-text_area_frontWeeks">
            4 недели
          </p>
          <p className="aboutProject-graph-text aboutProject-graph-text_area_backend">
            Back-end
          </p>
          <p className="aboutProject-graph-text aboutProject-graph-text_area_frontend">
            Front-end
          </p>
        </div>
    </section>
  );
}

export default AboutProject;