import React from 'react'
import { errorHandler } from './errorHandler'
import errorImage from '../assets/icons8-error-100.png'

function ErrorHandlerComponent({error}) {
    const errorMessage = errorHandler(error)
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
        <img src={errorImage} alt="error" /> 
        <p className="capitalize font-lato py-4">{errorMessage.toLowerCase()}</p> 
    </div>
  )
}

export default ErrorHandlerComponent