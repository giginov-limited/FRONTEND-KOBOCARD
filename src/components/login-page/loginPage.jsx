import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports'
import { logOut, setUserDetails } from '../../features/authSlice';
import { useDispatch } from 'react-redux/es/exports';
import axios from 'axios';
import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';



const LoginPage = () => {
  const {data, isLoading, isSuccess} = useGetUserDetailsQuery();

  
  let content = isLoading?<h4>Loading...</h4>:<h2>welcome {data.user.first_name}</h2>
  // const userInfo = useSelector((state)=> state.auth.userDetails)
  // console.log(userInfo)
  // let sum = (userInfo===null)?console.log('nothing'):<h2>{userInfo.first_name}...</h2>;

  return (
    <div>
    {
     content
    }
    </div>
  )
}

export default LoginPage