import React from 'react'
import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';



const LoginPage = () => {
  const {data, isLoading, isError, error, isSuccess,refetch} = useGetUserDetailsQuery();

  
  let content = (isLoading)?<h4>Loading...</h4>:
  (isSuccess)?<h2>welcome {data.user.first_name}</h2>:refetch();

  return (
    <div>
    {
     content
    }
    </div>
  )
}

export default LoginPage