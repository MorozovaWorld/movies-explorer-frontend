import React from 'react';
import { useHistory } from 'react-router-dom'; 

function PageNotFound () {
  const history = useHistory(); 

  const handleGoBack = () => {
    history.goBack()
  }

  return (
    <div className="PageNotFound">
      <div className="PageNotFound__container">
        <h2 className="PageNotFound__title">
            404
          </h2>
          <p className="PageNotFound__text">
            Страница не найдена
          </p>
        </div>
      <button className="PageNotFound__linkBack opacity opacity_useAt_button" onClick={handleGoBack}>Назад</button>
    </div>
  )
}

export default PageNotFound; 
