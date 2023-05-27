import logo from '../images/logo.svg'
import { Link } from 'react-router-dom';

function Header({ isAuthorizationPage, isLoginPage, buttontext, emailText, unloginUser }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      {isAuthorizationPage && <Link className='authorization-page__button' to={isLoginPage ? '/sign-up' : '/sign-in'}>{buttontext}</Link>}
      {!isAuthorizationPage && (
        <div className='header__nav'>
          <p style={{
            color:'#ffffff',
            margin:'0'
          }}>{emailText}</p>
          <button className='button' style={{
            color:'#a9a9a9'
          }} onClick={unloginUser}>Выйти</button>
        </div>
      )}
    </header>
  )
}

export default Header;