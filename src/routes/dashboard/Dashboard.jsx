import React from 'react'
import AllCardGames from '../../components/Game/dashboardGames/AllKardGames';
import bet from '../../assets/bet.jpg'
import bett from '../../assets/bett.svg'
import { useSelector } from 'react-redux';


const Dashboard = () => {
  const {user} = useSelector((state) => state.auth )



  return (
    <div className='font-inter py-12 w-11/12 md:w-9/12 mx-auto'>
      <div className='py-2 md:py-4 flex justify-start'>
      <h2 className='text-lg md:text-4xl font-bold uppercase'>Welcome {user.first_name}</h2>
    </div>
    <p className='italic text-sm md:text-lg font-extralight text-left '>Good Morning, Remember play a quick game</p>

    <div
      className='w-full  h-[200px] md:h-[450px] relative'
    >

    <img src={bet} className='absolute filter brightness-50 w-full h-[200px] md:h-full object-cover rounded-t-3xl' alt='' />
    <div className='absolute flex justify-between items-center md:items-start px-3 h-full max-w-full'>
      <div className='text-white flex flex-col justify-evenly gap-3 md:gap-12 self-center md:-mt-12 md:w-[600px]'>

        <div className='flex flex-col justify-start items-start gap-3'>
        <span className='text-base md:text-3xl font-bold tracking-wide'>More Cards, More Wins</span>
        <span className='text-xxs md:text-base text-left'>The more Kobocards you play, the higher your chances to win big</span>
        </div>

        <div className='flex justify-start gap-2 '>
          <div className='flex items-center gap-1 justify-start'>
            <div className=' bg-Choose-btn px-1 md:p-0  rounded-full  md:h-[55px] md:w-[55px]'>
            <span className='text-white font-bold text-base md:text-4xl'>C</span>
            </div>
            <span className='text-left text-xxs md:text-base'>Choose<br/>your Games</span>
          </div>
          <div className='flex items-center gap-1 justify-start'>
            <div className=' bg-Buy-btn px-1 md:p-0 rounded-full  md:h-[55px] md:w-[55px]'>
            <span className='text-white font-bold text-base md:text-4xl'>B</span>
            </div>
            <span className='text-left text-xxs md:text-base'>Buy <br/>Your KoboCard</span>
          </div>
          <div className='flex items-center gap-1 justify-start'>
            <div className=' bg-Win-btn px-1 md:p-0 rounded-full  md:h-[55px] md:w-[55px]'>
            <span className='text-white font-bold text-base md:text-4xl'>W</span>
            </div>
            <span className='text-left text-xxs md:text-base'>Win<br/>KoboCard Games</span>
          </div>
        </div>
      </div>


      <img className='-mr-12 -mt-8  md:-mr-32 md:-mt-24 w-[184px] h-[152px] md:w-[85%] md:h-[85%]' src={bett} alt="" />
      </div>
    </div>
    <div className='text-black grid grid-cols-3 '>
      <div className='py-2 flex flex-col gap-1 md:gap-3 justify-around items-center border border-black' >
        <span className='text-xsm md:text-xl font-semibold'>GETTING STARTED</span>
        <span className='text-xxs md:text-lg'>A brief guide on how to use Kobocards</span>
        <button className='text-white bg-btn-bg3 w-[51px] md:w-[137px] p-1 rounded-2xl text-xxs md:text-base'>More Info</button>
      </div>
      <div className='py-2 flex flex-col gap-1 md:gap-3  justify-around items-center border border-black' >
        <span className='text-xsm md:text-xl font-semibold'>HOW TO FUND YOUR WALLET</span>
        <span className='text-xxs md:text-lg'>A brief guide on how to use Kobocards</span>
        <button className='text-white bg-btn-bg3 w-[51px] md:w-[137px] p-1 rounded-2xl text-xxs md:text-base'>More Info</button>
      </div>
      <div className='py-2 flex flex-col gap-1 md:gap-3 justify-around items-center border border-black' >
        <span className='text-xsm md:text-xl font-semibold'>FAQs</span>
        <span className='text-xxs md:text-lg'>A brief guide on how to use Kobocards</span>
        <button className='text-white bg-btn-bg3 w-[51px] md:w-[137px] p-1 rounded-2xl text-xxs md:text-base'>More Info</button>
      </div>
    </div>
    <div className='mt-6 md:mt-12'>
      <span className='text-xl md:text-3xl'>All Card Games</span>
      <AllCardGames />
    </div>
    </div>
  )
}

export default Dashboard