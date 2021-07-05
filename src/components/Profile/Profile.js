import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import FormSubmitErr from '../FormSubmitErr/FormSubmitErr.js';
import {
  validators,
  REQUIRED_ERR_MESSAGE,
  MIN_LENGTH_ERR_MESSAGE,
  MAX_LENGTH_ERR_MESSAGE,
  EMAIL_UNVALID_ERR_MESSAGE,
  NAME_UNVALID_ERR_MESSAGE,
} from '../../utils/constants.js';
import Preloader from '../Preloader/Preloader'

function Profile({ handleSignOut, handleUpdateUserInfo, isSubmitResultData, isSubmitMessageDisplayed, setSubmitMessageDisplayed, isFetching }) {
  const user = React.useContext(CurrentUserContext);
//console.log(user.name);
//console.log(user.email);


  const [name, setName] = useState(`${user.name}`);
  const [email , setEmail ] = useState(`${user.email}`);

  React.useEffect(() => {
    setName(user.name);
    setEmail(user.email);

    setSubmitMessageDisplayed(false);
  }, [user, setSubmitMessageDisplayed]); 
  
  const handleNameChange = useCallback((e) => {
    setName(e.target.value);
  }, [setName]);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const handleInputFocus = (e) => {
    const { name } = e.target;

    setInputFocused({ ...isInputFocused,
      [name]: true
    })
  }

  // стейт фокуса инпутов для регуляции первичного рендера ошибок валидации,
  // если в фокусе – начать отображение ошибок
  const [isInputFocused, setInputFocused] = useState ({
    name: false,
    email: false,
  });

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
    }, [validationErrors.name, validationErrors.email, setFormValid, name, email, user.name, user.email])
  
    
    function handleSubmit(e) {
      e.preventDefault();
      
      if (!name || !email) {
        return;
      }
      if(name !== user.name || email !== user.email) {
        handleUpdateUserInfo(email, name);
      }
    }

  return (
      <form className="profile" name="name" onSubmit={handleSubmit}>
        <h2 className="profile__title">{`Привет, ${user.name}!`}</h2>
        <fieldset className="profile__form">
        {
          isFetching ? <Preloader /> :
          <>
            <div className="profile__input-container">
              <label htmlFor="user-name" className="profile__input-label">Имя</label>
              <input type="text" onFocus={handleInputFocus} onChange={handleNameChange} name='name' value={name} autoComplete='off' id="user-name" className="profile__input-text" required />
              <span id="email-error" className="profile__input-error">
                {isInputFocused.name && validationErrors.name.required && REQUIRED_ERR_MESSAGE}
                {!validationErrors.name.required && validationErrors.name.minlength && MIN_LENGTH_ERR_MESSAGE}
                {validationErrors.name.maxlength && MAX_LENGTH_ERR_MESSAGE}
                {!validationErrors.name.minlength && validationErrors.name.validate && NAME_UNVALID_ERR_MESSAGE}
              </span>
            </div>
            <div className="profile__input-container">
              <label htmlFor="user-email" className="profile__input-label">E-mail</label>
              <input type="email" onFocus={handleInputFocus} onChange={handleEmailChange} name='email' value={email} id="user-email" className="profile__input-text" autoComplete='off' required />
              <span id="email-error" className="profile__input-error">
                {isInputFocused.email && validationErrors.email.required && REQUIRED_ERR_MESSAGE}
                {!validationErrors.email.required && validationErrors.email.isEmail && EMAIL_UNVALID_ERR_MESSAGE}
              </span>
            </div>
            {isSubmitMessageDisplayed ? <FormSubmitErr isSubmitResultData={isSubmitResultData}></FormSubmitErr> : null}
          </>
        }
        </fieldset>
        <button type="submit" disabled={isFormValid} className="profile__button-submit opacity opacity_useAt_button">Редактировать</button>
        <Link onClick={handleSignOut} className="profile__button-signout opacity opacity_useAt_button" to="/" >Выйти из аккаунта</Link>
      </form>
  )
}

export default Profile;