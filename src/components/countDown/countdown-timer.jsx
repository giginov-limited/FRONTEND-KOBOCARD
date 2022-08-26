import { useEffect } from 'react';
import { useState } from 'react'
import { getRemainingTimeUntilMsTimestamp } from './utils/countdownTimerUtils';

const CountdownTimer = ({CountdownTimestampMs}) => {

  const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days:'00',
  }
   
    const [remainingTime , setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
      const intervalid = setInterval(()=>{
          updateRemainingTime(CountdownTimestampMs)
      }, 1000)

      return () => clearInterval(intervalid);
    }, [CountdownTimestampMs])

    function updateRemainingTime(countdown) {
       setRemainingTime( getRemainingTimeUntilMsTimestamp(countdown) )
    }

    return(
    <div className='w-full bg-timer-bg py-5 flex justify-around items-center text-xl '>
        <div className='max-w-[379px]'>
        <span className='font-inter tracking-wide '>Countdown to Next Card </span>
        </div>
        
        <div className='flex'> 

        <div className='flex flex-col mx-4 bg-timer rounded-md p-3 shadow-lg'>       
        <span>{remainingTime.days}</span>
        <span>days</span>
        </div> 

        <div className='flex flex-col mx-4 bg-timer rounded-md p-3 shadow-lg'>       
        <span>{remainingTime.hours}</span>
        <span>hours</span>
        </div> 

        <div className='flex flex-col mx-4 bg-timer rounded-md p-3 shadow-lg'>       
        <span>{remainingTime.minutes}</span>
        <span>minutes</span>
        </div> 

        <div className='flex flex-col mx-4 bg-timer rounded-md p-3 shadow-lg'>       
        <span>{remainingTime.seconds}</span>
        <span>seconds</span>
        </div> 
        
          </div>
    </div>
    )
}

export default CountdownTimer