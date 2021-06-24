import React, { useState, useEffect, useCallback } from 'react';
import FormPage from '../FormPage/FormPage.js';
import FormSubmitErr from '../FormSubmitErr/FormSubmitErr.js';
import {
  validators,
  requiredErrMessage,
  minLengthErrMessage,
  maxLengthErrMessage,
  isEmailErrMessage,
  routesConfig,
  isValidNameErrMessage
} from '../../utils/constants.js'

function Register({ handleRegister }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const {name, email, password} = userData;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setUserData(userData => ({
      ...userData,
      [name]: value
    }));
  }, [setUserData]);

  // стейт фокуса инпутов для регуляции первичного рендера ошибок валидации,
  // если в фокусе – начать отображение ошибок
  const [isInputFocused, setInputFocused] = useState ({
    name: false,
    email: false,
    password: false,
  });

  const handleInputFocus = (e) => {
    const { name } = e.target;

    setInputFocused({ ...isInputFocused,
      [name]: true
    })
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
    const {name, email, password} = userData;

    const nameValidationResult = Object.keys(validators.name).map((errorKey) => {
      const errorResult = validators.name[errorKey](name);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({ ...acc, ...el }), []);

    const emailValidationResult = Object.keys(validators.email).map((errorKey) => {
      const errorResult = validators.email[errorKey](email);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({ ...acc, ...el }), []);

    const passwordValidationResult = Object.keys(validators.password).map((errorKey) => {
      const errorResult = validators.name[errorKey](password);

      return { [errorKey]: errorResult }
    }).reduce((acc, el) => ({ ...acc, ...el }), []);

    setValidationErrors({
      name: nameValidationResult,
      email: emailValidationResult,
      password: passwordValidationResult,
    })
  }, [userData, setValidationErrors]);

  const [isFormValid, setFormValid] = useState(false);

  // общая проверка валидности формы для активации кнопки сабмита
  useEffect(function validateInputs() {
    const isNameValid = Object.values(validationErrors.name).some(Boolean);
    const isEmailValid = Object.values(validationErrors.email).some(Boolean);
    const isPasswordValid = Object.values(validationErrors.password).some(Boolean);

    setFormValid((isNameValid || isEmailValid || isPasswordValid));
  }, [validationErrors.name, validationErrors.email, validationErrors.password, setFormValid])

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password){
      return;
    }

    handleRegister(email, password);
  }
  
  return (
    <FormPage title='Добро пожаловать!' btnText="Зарегистрироваться" linkText="Войти" linkReason="Уже зарегистрированы?" linkUrl={routesConfig.singInUrl} isDisabled={isFormValid} handleSubmit={handleSubmit}>
      <div className="formPage__input-container">
        <label htmlFor="user-name" className="formPage__input-label">Имя</label>
        <input type="text" onFocus={handleInputFocus} onChange={handleChange} name='name' value={name} id="user-name" className="formPage__input-text" placeholder="Введите имя" autoComplete='off' required />
        <span id="name-error" className="formPage__input-error">
          {isInputFocused.name && validationErrors.name.required && requiredErrMessage}
          {!validationErrors.name.required && validationErrors.name.minlength && minLengthErrMessage}
          {validationErrors.name.maxlength && maxLengthErrMessage}
          {!validationErrors.name.minlength && validationErrors.name.validate && isValidNameErrMessage}
        </span>
      </div>
      <div className="formPage__input-container">
        <label htmlFor="user-email" className="formPage__input-label">E-mail</label>
        <input type="email" onFocus={handleInputFocus} onChange={handleChange} placeholder="Введите e-mail" name='email' value={email} id="user-email" className="formPage__input-text" autoComplete='off' required />
        <span id="email-error" className="formPage__input-error">
          {isInputFocused.email && validationErrors.email.required && requiredErrMessage}
          {!validationErrors.email.required && validationErrors.email.isEmail && isEmailErrMessage}
        </span>
      </div>
      <div className="formPage__input-container">
        <label htmlFor="user-password" className="formPage__input-label">Пароль</label>
        <input type="password" onFocus={handleInputFocus} onChange={handleChange} name='password' value={password} autoComplete='off' id="user-password" className="formPage__input-text" placeholder="Введите пароль" required />
        <span id="password-error" className="formPage__input-error">
          {isInputFocused.password && validationErrors.password.required && requiredErrMessage}
          {!validationErrors.password.required && validationErrors.password.minlength && minLengthErrMessage}
        </span>
        <FormSubmitErr errText=''></FormSubmitErr>
      </div>
    </FormPage>
  )
}

export default Register;
