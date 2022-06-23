import React, {Fragment} from 'react';
import {Outlet, Link} from 'react-router-dom'
import Footer from '../footer/footer'
import './navigation.style.scss'

const Navigation =() => {
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
          <button className="login-class">
            login
          </button>
          <button className='create-account'>
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
