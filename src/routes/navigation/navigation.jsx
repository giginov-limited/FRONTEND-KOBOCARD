import React, {Fragment} from 'react';
import {Outlet, Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports';
import theme from '../../assets/THEMES scvg.png'
import AccountMenu from '../../components/Menu';
import Buttons from '../../components/Button';
import SwipeableTemporaryDrawer from '../../components/Drawer';

const loginBtnStyle = {
  border: "1px solid #EAC95F",
  color:"white",
  width: "99px",
  height: "43px",
  borderRadius:"10px",
  "&:hover":{
    border: "1px solid #EAC95F",
  }
}

const SignUpBtnStyle = {
  background: "linear-gradient(141.35deg, #EAC95F 24.34%, #F1B151 77.78%)",
  color:"white",
  borderRadius:"10px",
}

const Navigation =() => {
  const navigate = useNavigate();
  const navigateToSignInPage = ()=>{
    navigate('/sign-in')
  }
  const navigateToSignUpPage = ()=>{
    navigate('/sign-up')
  }
  const user = useSelector((state)=> state.auth.user)

  return(

    <Fragment>
      <div className= "w-full grid grid-cols-2 md:flex md:justify-between py-3 md:py-0 md:my-0 max-h-[65px] bg-nav-bg md:bg-transparent">
        <Link className="flex justify-start w-full md:self-center md:max-w-[11%] mx-auto" to ='/'>
          {/* <span className="self-center text-3xl text-black font-semibold font-inter italic px-1 ">KoboCard</span> */}
          <img src={theme} alt="" className='mx-2 h-[30px] md:h-[60px] '/>
        </Link>
      
      <div className='hidden bg-nav-bg w-[88%] md:flex md:justify-around md:items-center py-2 rounded-tl-full'>
        <div className='hidded lg:flex gap-8 justify-around text-white text-lg '>
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
          user?(<AccountMenu />):(
            <div className='flex gap-4 mt-2 '>
            <Buttons variant={"outlined"} style={loginBtnStyle} text="login" onClick={navigateToSignInPage} />
            <Buttons variant={"contained"} style={SignUpBtnStyle} text="create account" onClick={navigateToSignUpPage} />
            </div>)
        }
      </div>
    </div>
    <div className='block justify-self-end md:hidden'>
    <SwipeableTemporaryDrawer user={user} />
    </div>
  </div>
      <Outlet />
   </Fragment>
  )
}

export default Navigation



