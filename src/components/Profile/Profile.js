import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import FormSubmitErr from '../FormSubmitErr/FormSubmitErr.js';
import {
  validators,
  routesConfig,
} from '../../utils/constants.js'

function Profile({ handleSignOut, handleUpdateUserInfo, sumbitErrMessage, updateSumbitMessage }) {
  const user = React.useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email , setEmail ] = useState('');
  const [isMessageShowed, setMessageShowed] = useState(false);

  React.useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]); 

  function handleNameChange(e) {
    setName(e.target.value);
    setMessageShowed(false);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setMessageShowed(false);
  }
  
  const [validationErrors, setValidationErrors] = useState ({
    name: {
      required: false,
      minlength: false,
      maxlength: false,
      validate: false,
    },
    email: {
      required: false,
      isEmail: false,
    },
    password: {
      required: false,
      minlength: false,
    },
  });

  // моментальная валидация инпутов и кнопки сабмита
  useEffect(function validateInputs() {
    const nameValidationResult = Object.keys(validators.name).map((errorKey) => {
      const errorResult = validators.name[errorKey](name);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({ ...acc, ...el }), []);

    const emailValidationResult = Object.keys(validators.email).map((errorKey) => {
      const errorResult = validators.email[errorKey](email);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({ ...acc, ...el }), []);

    setValidationErrors({
      name: nameValidationResult,
      email: emailValidationResult,
    })
  }, [name, email, setValidationErrors]);

  const [isFormValid, setFormValid] = useState(false);

    // общая проверка валидности формы для активации кнопки сабмита
    useEffect(function validateInputs() {
      const isNameValid = Object.values(validationErrors.name).some(Boolean);
      const isEmailValid = Object.values(validationErrors.email).some(Boolean);
  
      setFormValid((isNameValid || isEmailValid));
    }, [validationErrors.name, validationErrors.email, setFormValid])
  
    
    function handleSubmit(e) {
      e.preventDefault();
      
      if (!name || !email){
        return;
      }
      if (name !== user.name || email !== user.email) {
        handleUpdateUserInfo(name, email);
        setMessageShowed(true);
      } 
    }

  return (
      <form className="profile" name="name" onSubmit={handleSubmit} isDisabled={isFormValid}>
        <h2 className="profile__title">{`Привет, ${user.name}!`}</h2>
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
          {isMessageShowed ? <FormSubmitErr errText={updateSumbitMessage ? updateSumbitMessage : sumbitErrMessage} ></FormSubmitErr> : null}
        </fieldset>
        <button type="submit" className="profile__button-submit opacity opacity_useAt_button">Редактировать</button>
        <Link onClick={handleSignOut} className="profile__button-signout opacity opacity_useAt_button" to="/signin" >Выйти из аккаунта</Link>
      </form>
  )
}

export default Profile;