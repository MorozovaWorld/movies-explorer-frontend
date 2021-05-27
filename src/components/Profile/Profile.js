import React, { useState } from 'react';

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

  return (
      <form className="profile" name="name">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <fieldset className="profile__form">
          <div className="profile__input-container">
            <label for="user-name" className="profile__input-label">Имя</label>
            <input type="text" onChange={handleNameChange} name='name' value={name} autoComplete='off' id="user-name" className="profile__input-text" required />
            <span id="email-error" className="profile__input-error"></span>
          </div>
          <div className="profile__input-container">
            <label for="user-email" className="profile__input-label">E-mail</label>
            <input type="email" onChange={handleEmailChange} name='email' value={email} id="user-email" className="profile__input-text" autoComplete='off' required />
            <span id="email-error" className="profile__input-error"></span>
          </div>
        </fieldset>
        <button type="submit" className="profile__button-submit opacity opacity_useAt_button">Редактировать</button>
        <button type="submit" className="profile__button-signout opacity opacity_useAt_button">Выйти из аккаунта</button>
      </form>
  )
}

export default Profile;