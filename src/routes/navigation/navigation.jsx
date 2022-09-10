import React, {Fragment, useState} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';
import { logOut } from '../../features/authSlice';
import './navigation.style.scss'
import DisplayPicture from '../../components/Display-Picture/display-Picture';

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
  const navigateToWalletPage = () => navigate('/wallet')
  return(

    <Fragment>
      <div className= "w-full flex flex-wrap justify-around items-center mx-auto font-inter py-2 bg-nav-bg">
      <Link className="flex items-center" to ='/'>
      <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
      <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">KoboCard</span>
      </Link>

      <div className='flex gap-8 justify-around text-white'>
         <h3>Live Games</h3>
          <h3>Help</h3>
           <h3>Contacts</h3>
      </div>
      <div className='flex gap-16 justify-between items-center'>

        <div className="hidden relative md:block">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon
              </span>
          </div>
          <input type="text" id="search-navbar" class="block p-2 pl-10 w-full  rounded-lg border border-gray-300 sm:text-sm focus:outline-none" placeholder="Search..." />
        </div>

          {
            user?(
         <div className='flex gap-12 justify-center items-center'>
          <button onClick={navigateToWalletPage} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >
            Wallet
          </button>
          <div onClick={setDropdown} className='relative'>
          <div className='h-12 w-12 rounded-full'>
          <DisplayPicture />
          </div>
          {dropdownToggle ? <div className='absolute w-[200px] top-14 right-0 z-30 bg-dropdown-bg rounded shadow-md'>
            <ul className='space-y-2'>
              <li className='cursor-pointer hover:bg-gray-500 py-2' onClick={navigateToAccountPage}>Account</li>
              <li className='cursor-pointer hover:bg-gray-500 py-2' >Draw history</li>
              <li className='cursor-pointer hover:bg-gray-500 py-2' >Support</li>
              <li onClick={logOuthandler} className='cursor-pointer hover:bg-gray-500 py-2' > Log Out</li>
            </ul>
          </div> : null}
          </div>
         </div>) :
             (

         <div className='flex gap-4 mt-2 '>
          <button onClick={navigateToSignInPage} className="text-white  border border-gray-300 focus:outline-none hover:bg-gray-100 hover:text-black  font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 ">
            login
          </button>
          <button onClick={navigateToSignUpPage} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">
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



