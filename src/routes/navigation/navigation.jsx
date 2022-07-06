import React, {Fragment, useState} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports';
import './navigation.style.scss'

const Navigation =() => {
  const navigate = useNavigate();

  const navigateToSignInPage = ()=>{
    navigate('/sign-in')
  }

  const navigateToSignUpPage = ()=>{
    navigate('/sign-up')
  }

  const user = useSelector((state)=> state.auth.user)

  const [dropdownToggle, setDropdownToggle] = useState(false)

  const setDropdown=()=>{
    setDropdownToggle(!dropdownToggle);
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
          {
            user?(
         <div>
          <button onClick={navigateToSignInPage} className="wallet-class">
            Wallet
          </button>
          <button onClick={setDropdown} className='profile-pic'>
           Image
          </button>
         </div>) :
             (
         <div>
          <button onClick={navigateToSignInPage} className="login-class">
            login
          </button>
          <button onClick={navigateToSignUpPage} className='create-account'>
           Create Account
          </button>
         </div>)
          }
      </div>
      </div>
      {dropdownToggle ? <div className='dropdown'>the dropdown</div> : null}
      <Outlet />
   </Fragment>
  )
}

export default Navigation
