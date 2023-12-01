import { useEffect } from 'react';
import { useState } from 'react'
import { getRemainingTimeUntilMsTimestamp } from './utils/countdownTimerUtils';
import { useGetLastestGameQuery } from '../../app/api/authApiSlice';
import Loading from '../Loading/Loading.Component';

const CountdownTimer = ({ CountdownTimestampMs }) => {

  const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
  }

  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalid = setInterval(() => {
      updateRemainingTime(CountdownTimestampMs)
    }, 1000)

    return () => clearInterval(intervalid);
  }, [CountdownTimestampMs])

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown))
  }

  return (
    <div className='w-full  py-12 flex flex-col justify-around items-center text-xl gap-6 md:gap-12 '>
      <div className='max-w-[190px] md:max-w-[379px]'>
        <span className='font-inter tracking-wider text-xl md:text-4xl uppercase font-semibold'>Countdown to the Next Card </span>
      </div>

      <div className='flex'>

        <div className='flex flex-col mx-2 md:mx-4 font-light text-base md:text-6xl tracking-wide font-lato  p-3 '>
          <span>{remainingTime.days}</span>
          <span>days</span>
        </div>

        <div className='flex flex-col mx-2 md:mx-4 font-light text-base md:text-6xl tracking-wide font-lato  p-3 '>
          <span>{remainingTime.hours}</span>
          <span>hours</span>
        </div>

        <div className='flex flex-col mx-2 md:mx-4 font-light text-base md:text-6xl tracking-wide font-lato  p-3 '>
          <span>{remainingTime.minutes}</span>
          <span>minutes</span>
        </div>

        <div className='flex flex-col mx-2 md:mx-4 font-light text-base md:text-6xl tracking-wide font-lato  p-3 '>
          <span>{remainingTime.seconds}</span>
          <span>seconds</span>
        </div>

      </div>
    </div>
  )
}


const CountDownComponent = () => {
  const { data, isLoading, isSuccess, error } = useGetLastestGameQuery()
  let content =
    isLoading ? <Loading /> :
      isSuccess ? <CountdownTimer CountdownTimestampMs={(data.game.start_time * 1000)} /> :
        <h2>An error occured</h2>

  return (
    <div>{content}</div>
  )
}

export default CountDownComponent