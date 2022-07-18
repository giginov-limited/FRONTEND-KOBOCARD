import {Outlet} from 'react-router-dom';
import './homepage.scss'
import Navigation from '../navigation/navigation'
import CountdownTimer from '../../components/countDown/countdown-timer';
import OngoingCardGames from '../../components/Ongoing-Card-Games/OngoingCard.component';
import Extra from '../../components/Extras/extras';

const Home = () => {
  return(
    <div className='homepage-1'>
    <div
      className='background-image'
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1532699747151-80f124a15661?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')`,
      }}
    >
    <Navigation />
    <div className='txt'>
     <h1>WINNING BIG<br/> STARTS WITH<br/> KOBOCARD</h1>
     </div>
    </div>
    <CountdownTimer CountdownTimestampMs={1660462547000}/>
    <OngoingCardGames />
    <Extra />
    <Outlet />
    </div>
  )
}

export default Home
