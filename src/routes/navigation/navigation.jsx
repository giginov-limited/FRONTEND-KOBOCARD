import React, {Fragment} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom'
import './navigation.style.scss'

const Navigation =() => {
  const navigate = useNavigate();

  const navigateToSignInPage = ()=>{
    navigate('/sign-in')
  }

  const navigateToSignUpPage = ()=>{
    navigate('/sign-up')
  }

  return(

    <Fragment>
      <div className= 'navigation'>
      <Link className='logo-container' to ='/'>
         <h1>KoboCard</h1>
      </Link>
      <div className='middle-links'>
         <h3>Live Games</h3>
          <h3>Help</h3>
           <h3>Contacts</h3>
      </div>
      <div className='end-links'>
          <input type='text' placeholder='search...' className="search-box"/>
         <div>
          <button onClick={navigateToSignInPage} className="login-class">
            login
          </button>
          <button onClick={navigateToSignUpPage} className='create-account'>
           Create Account
          </button>
         </div>
      </div>
      </div>
      <Outlet />
   </Fragment>
  )
}

export default Navigation
