import {Outlet} from 'react-router-dom';
import Navigation from '../navigation/navigation'
import CountdownTimer from '../../components/countDown/countdown-timer';
import OngoingCardGames from '../../components/Ongoing-Card-Games/OngoingCard.component';
import Extra from '../../components/Extras/extras';
import pic from '../../assets/home.jpg'

const Home = () => {
  return(
    <div className='homepage-1 overflow-hidden'>
      <Navigation />

      <div className='flex justify-end items-center overflow-hidden h-[400px] gap-1'>

        <svg width="10" height="237" viewBox="0 0 10 237" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="5.96597" y1="4.03375" x2="4.03376" y2="232.034" stroke="#101A1C" stroke-width="8" stroke-linecap="round"/>
        </svg>

        <svg width="8" height="313" viewBox="0 0 8 313" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="4" y1="4" x2="3.99999" y2="309" stroke="#EEBC58" stroke-width="8" stroke-linecap="round"/>
        </svg>

        <div className='bg-btn-bg w-[88%] relative bg-no-repeat bg-cover h-full'
          style={{
            backgroundImage: `url(${pic})`,
          }} 
        >
          <div className='flex flex-col justify-center items-start w-full h-full px-10 gap-3'>

            <div class="p-4 max-w-[650px] bg-white bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg text-white text-5xl font-bold text-left"> 
              Take a Chance and Win BIg<br/>
              With <span className='text-home-text'>KoboCard</span>
            </div>

            <button className="focus:outline-none text-white bg-gradient-to-r hover:bg-gradient-to-br from-btn-bg to-btn-bg2 font-medium rounded-lg text-lg px-5 py-3 mr-2 mb-2 ">
              Buy KoboCard
            </button>
          </div>
        </div>
      </div>
    <OngoingCardGames />
    <CountdownTimer CountdownTimestampMs={1672576160000}/>
    
    {/* <Extra /> */}
    <Outlet />
    
    </div>
  )
}

export default Home
