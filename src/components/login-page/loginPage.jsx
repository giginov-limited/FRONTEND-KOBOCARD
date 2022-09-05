import React from 'react'
import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';
import AllCardGames from '../AllCardsGames/AllCardGames';
import './login.styles.scss'



const LoginPage = () => {
  const {data, isLoading, isError, error, isSuccess,refetch} = useGetUserDetailsQuery();

  
  let content = (isLoading)?<h4>Loading...</h4>:
  (isSuccess)?(
    <div className='py-4'>
      <h2 className='text-xl uppercase'>Welcome {data.user.first_name}</h2>
    </div>
  ):refetch();

  return (
    <div className='font-inter bg-BG'>
    {content}
    <div className="flex gap-14 justify-center my-5">
      <div className="flex flex-col justify-between  w-[269px] h-[216px] shadow-lg p-2 bg-pay-bg rounded-md">
        <p className='my-3 text-xl'>Getting Started</p>
        <p className='text-left'>A brief guide on using KoboCard from A - Z</p>
        <button
        className='bg-btn-bg text-white py-2 rounded' 
        >More Info</button>
      </div>
      <div className="flex flex-col justify-between  w-[269px] h-[216px] shadow-lg p-2 bg-pay-bg rounded-md">
        <p className='my-3 text-xl'>HOW TO FUND YOUR WALLET </p>
        <p className='text-left'>A brief guide on using KoboCard from A - Z</p>
        <button
        className='bg-btn-bg text-white py-2 rounded' 
        >More Info</button>
      </div>
      <div className="flex flex-col justify-between  w-[269px] h-[216px] shadow-lg p-2 bg-pay-bg rounded-md">
        <p className='my-3 text-xl'>FAQ</p>
        <p className='text-left'>A brief guide on using KoboCard from A - Z</p>
        <button
        className='bg-btn-bg text-white py-2 rounded' 
        >More Info</button>
      </div>
    </div>

    <div className='mt-12'>
      <span className='text-3xl'>All Card Games</span>
      <AllCardGames />
    </div>
    </div>
  )
}

export default LoginPage