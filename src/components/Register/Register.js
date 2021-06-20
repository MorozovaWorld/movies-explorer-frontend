import React, { useState, useEffect, useCallback } from 'react';
import FormPage from '../FormPage/FormPage.js';
import FormSubmitErr from '../FormSubmitErr/FormSubmitErr.js';
import {validators} from '../../utils/constants.js'

function Register() {
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

  const [validationErrors, setValidationErrors] = useState ({
    name: {
      required: false,
      minlength: false,
      maxlength: false,
    },
    email: {
      required: false,
      isEmail: false,
    },
    password: {
      required: false,
    },
  });

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

  const isNameValid = Object.values(validationErrors.name).some(Boolean);
  const isEmailValid = Object.values(validationErrors.email).some(Boolean);
  const isPasswordValid = Object.values(validationErrors.password).some(Boolean);
  const isSubmitDisabled = (isNameValid || isEmailValid || isPasswordValid);

  return (
    <FormPage title='Добро пожаловать!' btnText="Зарегистрироваться" linkText="Войти" linkReason="Уже зарегистрированы?" linkUrl="/signin" isDisabled={isSubmitDisabled}>
      <div className="formPage__input-container">
        <label htmlFor="user-name" className="formPage__input-label">Имя</label>
        <input type="text" onChange={handleChange} name='name' value={name} id="user-name" className="formPage__input-text" placeholder="Введите имя" autoComplete='off' required />
        <span id="name-error" className="formPage__input-error">
          {validationErrors.name.required && 'Поле не заполнено'}
          {!validationErrors.name.required && validationErrors.name.minlength && 'Минимальное количество символов: 2'}
          {validationErrors.name.maxlength && 'Максимальное количество символов: 30'}
        </span>
      </div>
      <div className="formPage__input-container">
        <label htmlFor="user-email" className="formPage__input-label">E-mail</label>
        <input type="email" onChange={handleChange} placeholder="Введите e-mail" name='email' value={email} id="user-email" className="formPage__input-text" autoComplete='off' required />
        <span id="email-error" className="formPage__input-error">
          {validationErrors.email.required && 'Поле не заполнено'}
          {!validationErrors.email.required && validationErrors.email.isEmail && 'Введите, пожалуйста, email'}
        </span>
      </div>
      <div className="formPage__input-container">
        <label htmlFor="user-password" className="formPage__input-label">Пароль</label>
        <input type="password" onChange={handleChange} name='password' value={password} autoComplete='off' id="user-password" className="formPage__input-text" required />
        <span id="email-error" className="formPage__input-error">
          {validationErrors.password.required && 'Поле не заполнено'}
        </span>
        <FormSubmitErr errText=''></FormSubmitErr>
      </div>
    </FormPage>
  )
}

export default Register;
