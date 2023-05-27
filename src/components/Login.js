import React from 'react';
import AuthorizationPage from './AuthorizationPage';

import * as auth from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginUser }) => {

  const navigate = useNavigate();

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleAuthorize = (e) => {
    e.preventDefault();

    const {email, password} = formValue;

    auth.authorize(email, password)
    .then(res => {
      localStorage.setItem('token', res.token);

      auth.getLoggedUserInfo(res.token)
      .then(data => {
        loginUser(data.data.email);
        navigate('/', {replace: true});
      })
      .catch(err => console.log(`Ошибка ${err}, не удалось авторизоваться`))
      
    })
    .catch((err) => console.log(`Ошибка ${err}, не удалось авторизоваться`))
  }

  return (
    <AuthorizationPage
      title='Вход' 
      isLoginPage={true}
      headerButtonText='Регистрация'
    >
      <form className='authorization-page__form' onSubmit={handleAuthorize}>
        <input className="authorization-page__input" type="email" name="email" placeholder="Email" value={formValue.email} onChange={handleChange} required />
        <input className="authorization-page__input" type="password" name="password" placeholder="Пароль" required value={formValue.password} onChange={handleChange} />
        <button className="authorization-page__button authorization-page__button_purpose_submit">Войти</button>
      </form>
    </AuthorizationPage>
  );
}

export default Login;