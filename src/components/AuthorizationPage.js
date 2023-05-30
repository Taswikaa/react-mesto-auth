import React from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import InfoPopup from './InfoPopup';

import * as auth from '../utils/auth.js';

const AuthorizationPage = ({ title, isLoginPage, children }) => {
  return (
    <>
      <div className='authorization-page'>
        <p className='authorization-page__title'>{title}</p>
        {children}
        
        {!isLoginPage && (
          <div className='authorization-page__link-to-login-block'>
            <p className='authorization-page__link-to-login-block-text'>Уже зарегистрированы? </p>
            <Link className='authorization-page__link-to-login-block-button authorization-page__button authorization-page__button_fz_small' to='/sign-in'>Войти</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default AuthorizationPage;