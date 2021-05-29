import React, { useState } from 'react';
import FormPage from '../FormPage/FormPage.js';

function Register() {
  const [userData, setUserData] = useState({
    name: '',
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
    <FormPage title='Добро пожаловать!' btnText="Зарегистрироваться" linkText="Войти" linkReason="Уже зарегистрированы?" linkUrl="/signin">
      <div className="formPage__input-container">
        <label for="user-name" className="formPage__input-label">Имя</label>
        <input type="text" onChange={handleChange} name='name' value={userData.name} id="user-name" className="formPage__input-text" autoComplete='off' required />
        <span id="name-error" className="formPage__input-error"></span>
      </div>
      <div className="formPage__input-container">
        <label for="user-email" className="formPage__input-label">E-mail</label>
        <input type="email" onChange={handleChange} name='email' value={userData.email} id="user-email" className="formPage__input-text" autoComplete='off' required />
        <span id="email-error" className="formPage__input-error"></span>
      </div>
      <div className="formPage__input-container">
        <label for="user-password" className="formPage__input-label">Пароль</label>
        <input type="password" onChange={handleChange} name='password' value={userData.password} autoComplete='off' id="user-password" className="formPage__input-text" required />
        <span id="password-error" className="formPage__input-error"></span>
      </div>
    </FormPage>
  )
}

export default Register;
