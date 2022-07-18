import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import { logOut } from '../../features/authSlice';
import { useDispatch } from 'react-redux/es/exports';
import axios from 'axios';
import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';


const LoginPage = () => {
 const user = useSelector((state)=> state.auth.user);
 const token = useSelector((state)=> state.auth.token);

 const dispatch = useDispatch()
 const logOutHandler = () => dispatch(logOut());

 //called it here

//  const{
//   data: users,
//   isLoading,
//   isSuccess,
//   isError,
//   error
//  } = useGetUserDetailsQuery()

//  let content ; if(isLoading){console.log('loading')} 
//  else if(isSuccess){console.log('success')}
//  else if(isError){console.log(JSON.stringify(error))}



axios.get(
  'https://kobo-card.herokuapp.com/users/getUser',
  {headers: {
    "Content-Type": "application/json"
    }
  }
)
.then((response) => {
    var response = response.data;
    console.log(response);
  },
  (error) => {
    var status = error.response.status
  }
);

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