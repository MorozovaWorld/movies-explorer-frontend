import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [name, setName] = useState('Виталий');
  const [email , setEmail ] = useState('pochta@yandex.ru');

  React.useEffect(() => {
    setName(name);
    setEmail(email);
  }, [name, email]); 

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    setName(name);
    setEmail(email);
  }
  
  return (
      <form className="profile" name="name" onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${name}!`}</h2>
        <fieldset className="profile__form">
          <div className="profile__input-container">
            <label htmlFor="user-name" className="profile__input-label">Имя</label>
            <input type="text" onChange={handleNameChange} name='name' value={name} autoComplete='off' id="user-name" className="profile__input-text" required />
            <span id="email-error" className="profile__input-error"></span>
          </div>
          <div className="profile__input-container">
            <label htmlFor="user-email" className="profile__input-label">E-mail</label>
            <input type="email" onChange={handleEmailChange} name='email' value={email} id="user-email" className="profile__input-text" autoComplete='off' required />
            <span id="email-error" className="profile__input-error"></span>
          </div>
        </fieldset>
        <button type="submit" className="profile__button-submit opacity opacity_useAt_button">Редактировать</button>
        <Link className="profile__button-signout opacity opacity_useAt_button" to="/signin" >Выйти из аккаунта</Link>
      </form>
  )
}

export default Profile;