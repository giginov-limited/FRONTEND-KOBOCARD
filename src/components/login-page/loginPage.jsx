import React from 'react'
import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';
import AllCardGames from '../AllCardsGames/AllCardGames';
import Loading from '../Loading/Loading.Component';
import bet from '../../assets/bet.jpg'
import bett from '../../assets/bett.svg'
import './login.styles.scss'



const LoginPage = () => {
  const {data, isLoading, isError, error, isSuccess,refetch} = useGetUserDetailsQuery();

  
  let content = (isLoading)?
  <Loading />:
  (isSuccess)?(
    <div className='py-4 flex justify-start'>
      <h2 className='text-4xl font-bold uppercase'>Welcome {data.user.first_name}</h2>
    </div>
  ):refetch();

  return (
    <div className='font-inter py-12 w-9/12 mx-auto'>
    {content}
    <p className='italic text-lg font-extralight text-left'>Good Morning, Remember play a quick game</p>

    <div
      style={{
        backgroundImage:`url(${bet})`,
       }}
      className='w-full h-[450px] bg-cover bg-no-repeat object-cover rounded-t-2xl flex flex-col  justify-start items-start p-12 relative'
    >

      <div className='text-white flex flex-col justify-evenly h-full'>

        <div className='flex flex-col justify-start items-start gap-3'>
        <span className='text-3xl font-bold tracking-wide'>More Cards, More Wins</span>
        <span className='text-lg'>The more Kobocards you play, the higher your chances to win big</span>
        </div>

        <div className='flex justify-start gap-2'>
          <div className='flex items-center gap-1 justify-start'>
            <div className=' bg-Choose-btn p-2 rounded-full h-[55px] w-[55px]'>
            <span className='text-white font-bold text-4xl'>C</span>
            </div>
            <span className='text-left'>Choose<br/> your Games</span>
          </div>
          <div className='flex items-center gap-1 justify-start'>
            <div className=' bg-Buy-btn p-2 rounded-full h-[55px] w-[55px]'>
            <span className='text-white font-bold text-4xl'>B</span>
            </div>
            <span className='text-left'>Buy <br/> Your KoboCard</span>
          </div>
          <div className='flex items-center gap-1 justify-start'>
            <div className=' bg-Win-btn p-2 rounded-full h-[55px] w-[55px]'>
            <span className='text-white font-bold text-4xl'>W</span>
            </div>
            <span className='text-left'>Win<br/>KoboCard Games</span>
          </div>
        </div>
      </div>
      <img className='absolute top-0 right-0 -mr-24' src={bett} alt="" />
    </div>
    <div className='text-black grid grid-cols-3 '>
      <div className='py-2 flex flex-col gap-3 justify-around items-center border border-black' >
        <span className='text-xl font-semibold'>GETTING STARTED</span>
        <span className='text-lg'>A brief guide on how to use Kobocards</span>
        <button className='text-white bg-btn-bg3 w-[137px] p-1 rounded-2xl'>More Info</button>
      </div>
      <div className='py-2 flex flex-col gap-3  justify-around items-center border border-black' >
        <span className='text-xl font-semibold'>HOW TO FUND YOUR WALLET</span>
        <span className='text-lg'>A brief guide on how to use Kobocards</span>
        <button className='text-white bg-btn-bg3 w-[137px] p-1 rounded-2xl'>More Info</button>
      </div>
      <div className='py-2 flex flex-col gap-3 justify-around items-center border border-black' >
        <span className='text-xl font-semibold'>FAQs</span>
        <span className='text-lg'>A brief guide on how to use Kobocards</span>
        <button className='text-white bg-btn-bg3 w-[137px] p-1 rounded-2xl'>More Info</button>
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