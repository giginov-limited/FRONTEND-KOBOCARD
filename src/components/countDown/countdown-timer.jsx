import { useEffect } from 'react';
import { useState } from 'react'
import './countDownTimer.scss'
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
    <div className='countdown-timer'>
        <div className='countdown-text'>
        <span>Countdown to Next Card </span>
        </div>
        
        <div className='countdown-timers'> 

        <div className='countdown'>       
        <span>{remainingTime.days}</span>
        <span>days</span>
        </div> 

        <div className='countdown'>       
        <span>{remainingTime.hours}</span>
        <span>hours</span>
        </div> 

        <div className='countdown'>       
        <span>{remainingTime.minutes}</span>
        <span>minutes</span>
        </div> 

        <div className='countdown'>       
        <span>{remainingTime.seconds}</span>
        <span>seconds</span>
        </div> 
        
          </div>
    </div>
    )
}

export default CountdownTimer