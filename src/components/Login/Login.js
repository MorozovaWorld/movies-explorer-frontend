import React, { useState, useCallback, useEffect } from 'react';
import FormPage from '../FormPage/FormPage.js';
import FormSubmitErr from '../FormSubmitErr/FormSubmitErr.js';
import {
  validators,
  REQUIRED_ERR_MESSAGE,
  MIN_LENGTH_ERR_MESSAGE,
  EMAIL_UNVALID_ERR_MESSAGE,
  routesConfig,
} from '../../utils/constants.js'

function Login({ handleLogin, isSubmitResultData, isSubmitMessageDisplayed, setSubmitMessageDisplayed }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const {email, password} = userData;
  // const [isErrMessageShowed, setErrMessageShowed] = useState(false);

  React.useEffect(() => {
    setSubmitMessageDisplayed(false);
  }, [setSubmitMessageDisplayed]); 

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
    email: false,
    password: false,
  });

  const handleInputFocus = (e) => {
    // setErrMessageShowed(false);
    const { name } = e.target;
    setInputFocused({ ...isInputFocused,
      [name]: true
    })
  }

  const [validationErrors, setValidationErrors] = useState ({
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
      const {email, password} = userData;
  
      const emailValidationResult = Object.keys(validators.email).map((errorKey) => {
        const errorResult = validators.email[errorKey](email);
  
        return { [errorKey]: errorResult }
      }).reduce((acc, el) => ({ ...acc, ...el }), []);
  
      const passwordValidationResult = Object.keys(validators.password).map((errorKey) => {
        const errorResult = validators.name[errorKey](password);
  
        return { [errorKey]: errorResult }
      }).reduce((acc, el) => ({ ...acc, ...el }), []);
  
      setValidationErrors({
        email: emailValidationResult,
        password: passwordValidationResult,
      })
    }, [userData, setValidationErrors]);

    const [isFormValid, setFormValid] = useState(false);

    // общая проверка валидности формы для активации кнопки сабмита
    useEffect(function validateInputs() {
      const isEmailValid = Object.values(validationErrors.email).some(Boolean);
      const isPasswordValid = Object.values(validationErrors.password).some(Boolean);
  
      setFormValid((isEmailValid || isPasswordValid));
    }, [validationErrors.email, validationErrors.password, setFormValid])

    function handleSubmit(e) {
      e.preventDefault();
      if (!email || !password){
        return;
      }
  
      handleLogin(email, password);
    }

  return (
    <FormPage title='Рады видеть!' btnText="Войти" linkText="Регистрация" linkReason="Ещё не зарегистрированы?" linkUrl={routesConfig.signUpUrl} isDisabled={isFormValid} handleSubmit={handleSubmit}>
      <div className="formPage__input-container">
        <label htmlFor="user-email" className="formPage__input-label">E-mail</label>
        <input type="email" onFocus={handleInputFocus} onChange={handleChange} name='email' value={email} id="user-email" className="formPage__input-text" autoComplete='off' required />
        <span id="email-error" className="formPage__input-error">
          {isInputFocused.email && validationErrors.email.required && REQUIRED_ERR_MESSAGE}
          {!validationErrors.email.required && validationErrors.email.isEmail && EMAIL_UNVALID_ERR_MESSAGE}
        </span>
      </div>
      <div className="formPage__input-container">
        <label htmlFor="user-password" className="formPage__input-label">Пароль</label>
        <input type="password" onFocus={handleInputFocus} onChange={handleChange} name='password' value={password} autoComplete='off' id="user-password" className="formPage__input-text" required />
        <span id="password-error" className="formPage__input-error">
          {isInputFocused.password && validationErrors.password.required && REQUIRED_ERR_MESSAGE}
          {!validationErrors.password.required && validationErrors.password.minlength && MIN_LENGTH_ERR_MESSAGE}
        </span>
        {isSubmitMessageDisplayed ? <FormSubmitErr isSubmitResultData={isSubmitResultData}></FormSubmitErr> : null}
      </div>
    </FormPage>
  )
}

export default Login;
