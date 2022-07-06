import React from 'react'
import { useSelector } from 'react-redux/es/exports'

const LoginPage = () => {
 const user = useSelector((state)=> state.auth.user);

  return (
    <div>
    <h2>
      Welcome {user.first_name}...
    </h2>
    </div>
  )
}

export default LoginPage