import React, { useState } from 'react';
import FormPage from '../FormPage/FormPage.js';
import FormSubmitErr from '../FormSubmitErr/FormSubmitErr.js';

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value
    })
  }

  return (
    <FormPage title='Рады видеть!' btnText="Войти" linkText="Регистрация" linkReason="Ещё не зарегистрированы?" linkUrl="/signup">
      <div className="formPage__input-container">
        <label for="user-email" className="formPage__input-label">E-mail</label>
        <input type="email" onChange={handleChange} name='email' value={userData.email} id="user-email" className="formPage__input-text" autoComplete='off' required />
        <span id="email-error" className="formPage__input-error"></span>
      </div>
      <div className="formPage__input-container">
        <label for="user-password" className="formPage__input-label">Пароль</label>
        <input type="password" onChange={handleChange} name='password' value={userData.password} autoComplete='off' id="user-password" className="formPage__input-text" required />
        <FormSubmitErr errText=''></FormSubmitErr>
      </div>
    </FormPage>
  )
}

export default Login;
