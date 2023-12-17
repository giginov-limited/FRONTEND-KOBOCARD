import { useEffect } from 'react';
import { useState } from 'react'
import './countDownTimer.scss'
import { getRemainingTimeUntilMsTimestamp } from './utils/countdownTimerUtils';

const Countdown = ({CountdownTimestampMs}) =>{
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
          }, 3000)
    
          return () => clearInterval(intervalid);
        }, [CountdownTimestampMs])
    
        function updateRemainingTime(countdown) {
           setRemainingTime( getRemainingTimeUntilMsTimestamp(countdown) )
        }
    return(
        <div>{remainingTime.days}:{remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}</div>
    )
}

export default Countdown