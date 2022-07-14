import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import { logOut } from '../../features/authSlice';
import { useDispatch } from 'react-redux/es/exports';
import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';


const LoginPage = () => {
 const user = useSelector((state)=> state.auth.user);

 const dispatch = useDispatch()
 const logOutHandler = () => dispatch(logOut());

  return (
    <div>
    <h2>
      Welcome {user.first_name}...
    </h2>
    <button onClick={logOutHandler}>log Out</button>
    </div>
  )
}

export default LoginPage