import React, {Fragment, useState} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { logOut } from '../../features/authSlice'; 
import DisplayPicture from '../../components/Display-Picture/display-Picture';
import theme from '../../assets/THEMES scvg.png'
import usericon from '../../assets/user-icon.svg'
import drawIcon from '../../assets/draw-history.svg'
import logOutIcon from "../../assets/logOut.svg"

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
  //Remember to added toggle functionalites to the window
  //so when the user clicks outside the dropdown it clears

  const setDropdown=()=>{
    setDropdownToggle(!dropdownToggle);
  }

  const dispatch = useDispatch();

  const logOuthandler = () => {
     dispatch(logOut())
  }

  const navigateToAccountPage = () => navigate('/account')
  const navigateToWalletPage = () => navigate('/wallet')
  const navigateToKardHistory = () => navigate('/game-history')
  const navigateToDashboard = () => navigate('/dashboard')

  const styles = {
    width: "44px",
    height: "44px",
}
  return(

    <Fragment>
      <div className= "w-full flex justify-between ">

      <Link className="self-center max-w-[11%] mx-auto" to ='/'>
      {/* <span className="self-center text-3xl text-black font-semibold font-inter italic px-1 ">KoboCard</span> */}
      <img src={theme} alt="" className='mx-2 h-[60px]'/>
      </Link>
      
      <div className='bg-nav-bg w-[88%] flex justify-around items-center py-2 rounded-tl-full'>
      <div className='flex gap-8 justify-around text-white text-lg'>
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
          <input type="text" id="search-navbar" className="block p-2 pl-10 w-full  rounded-full border border-gray-300 sm:text-sm focus:outline-none" placeholder="Search..." />
        </div>

          {
            user?(
         <div className='flex gap-12 justify-center items-center'>
          <button onClick={navigateToWalletPage} className="focus:outline-none text-white bg-gradient-to-br from-btn-bg to-btn-bg2 font-medium rounded-lg text-lg px-5 py-1 mr-2 mb-2 " >
            Wallet
          </button>
          <div onClick={setDropdown} className='relative'>
          <div className='h-12 w-12 rounded-full'>
          <DisplayPicture styles={styles}/>
          </div>
          {dropdownToggle ? <div className='absolute w-[200px] top-14 right-0 z-30 bg-white rounded-b-lg shadow-lg'>
            <ul className='space-y-4 px-6'>

              <li className='cursor-pointer py-2 group text-black transition-all duration-300 ease-in-out' onClick={navigateToDashboard}>
                <div className='bg-left-bottom bg-gradient-to-r flex justify-between py-1 pr-1 from-black to-black bg-[length:0%_1px] bg-no-repeat group-hover:bg-[length:100%_1px] transition-all duration-500 ease-out'>
                  <span>Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#008092" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2 6.75A.75.75 0 012.75 6h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 6.75zm0 6.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M2 6.75A.75.75 0 012.75 6h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 6.75zm0 6.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                  </svg>
                </div>
              </li>

              <li className='cursor-pointer py-2 group text-black transition-all duration-300 ease-in-out' onClick={navigateToAccountPage}>
                <div className='py-1 flex justify-between gap-2 bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-no-repeat group-hover:bg-[length:100%_1px] transition-all duration-500 ease-out'>
                  <span>User Account</span>
                <img src={usericon} alt="" />
                </div>
              </li>

              <li className='cursor-pointer py-2 group text-black transition-all duration-300 ease-in-out' onClick={navigateToKardHistory}>
              <div className='py-1 flex justify-between gap-2 bg-left-bottom bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-no-repeat group-hover:bg-[length:100%_1px] transition-all duration-500 ease-out'>
              <span>Draw History</span>
              <img src={drawIcon} alt="" />
              </div>
              </li>

              <li onClick={logOuthandler} className="cursor-pointer">
                <div className='flex justify-end items-center gap-2 text-xs font-semibold my-2'>
                  logOut 
                  <img src={logOutIcon} alt=""  />
                </div>
              </li>
            </ul>
          </div> : null}
          </div>
         </div>) :
             (

         <div className='flex gap-4 mt-2 '>
          <button onClick={navigateToSignInPage} className="text-white  border border-btn-bg focus:outline-none hover:bg-btn-bg hover:text-white  font-medium rounded-lg py-1 text-lg px-5 mr-2 mb-2 ">
            Login
          </button>
          <button onClick={navigateToSignUpPage} className="focus:outline-none text-white bg-gradient-to-br from-btn-bg to-btn-bg2 font-medium rounded-lg text-lg px-5 py-1 mr-2 mb-2 ">
           Create Account
          </button>
         </div>)
          }
      </div>
      </div>
      </div>
      <Outlet />
   </Fragment>
  )
}

export default Navigation



