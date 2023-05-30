import logo from '../images/logo.svg'
import { Link } from 'react-router-dom';

function Header({ isAuthorizationPage, isLoginPage, buttonText, emailText, signOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {isAuthorizationPage && <Link className='authorization-page__button' to={isLoginPage ? '/sign-up' : '/sign-in'}>{buttonText}</Link>}
      {!isAuthorizationPage && (
        <div className='header__nav'>
          <p className='header__text'>{emailText}</p>
          <button className='button header__button' onClick={signOut}>Выйти</button>
        </div>
      )}
    </header>
  )
}

export default Header;