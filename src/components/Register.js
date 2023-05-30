import React from 'react';
import AuthorizationPage from './AuthorizationPage';
import { Link, useNavigate } from 'react-router-dom';

import * as auth from '../utils/auth.js';

const Register = ({ setInfoTooltipStatus }) => {

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

  const handleRegistration = (e) => {
    e.preventDefault();

    const {email, password} = formValue;

    auth.register(email, password)
    .then(res => {
      console.log('удалось зарегистрироваться');
      setInfoTooltipStatus(true);
      navigate('/sign-in', {replace: true});
    })
    .catch(err => {
      // console.log('Не удалось зарегистрироваться', err);
      setInfoTooltipStatus(false);
    })
  }

  return (
    <AuthorizationPage
      title='Регистрация' 
      isLoginPage={false}
      headerButtonText='Войти'
    >
      <form className='authorization-page__form' onSubmit={handleRegistration}>
        <input className="authorization-page__input" type="email" name="email" placeholder="Email" value={formValue.email} onChange={handleChange} required />
        <input className="authorization-page__input" type="password" name="password" placeholder="Пароль" required value={formValue.password} onChange={handleChange} />
        <button className="authorization-page__button authorization-page__button_purpose_submit">Зарегистрироваться</button>
      </form>
    </AuthorizationPage>
  );
}

export default Register;