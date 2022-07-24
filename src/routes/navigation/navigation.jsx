import React, {Fragment, useState} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';
import { Image } from 'cloudinary-react';
import { logOut } from '../../features/authSlice';
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

  const dispatch = useDispatch();

  const logOuthandler = () => {
     dispatch(logOut())
  }

  const navigateToAccountPage = () => navigate('/account-page')
  const {data, isLoading,isError,error} = useGetUserDetailsQuery();
  let imageData = (isLoading || isError || error)?"https://res.cloudinary.com/kobocard/image/upload/v1658695490/sv1m2penyqmbzemh8bna.jpg":data.user.picture
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
         <div className='buttons'>
          <button onClick={navigateToSignInPage} className="wallet-class">
            Wallet
          </button>
          <div onClick={setDropdown} className='profile-pic'>
          
          <Image cloudName='kobocard' publicId={imageData} className='image'/>
          {dropdownToggle ? <div className='dropdown'>
            <ul>
              <li onClick={navigateToAccountPage}>Account</li>
              <li>Draw history</li>
              <li>Support</li>
              <li onClick={logOuthandler}> Log Out</li>
            </ul>
          </div> : null}
          </div>
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
      <Outlet />
   </Fragment>
  )
}

export default Navigation
