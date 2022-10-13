import Navigation from '../navigation/navigation'
import CountdownTimer from '../../components/countDown/countdown-timer';
import OngoingCardGames from '../../components/Game/ongoing/OngoingCard.component';
import pic from '../../assets/home.jpg'
import Buttons from '../../components/Button';

const btnStyles = {
  color:"#FFF",
  background: "linear-gradient(141.35deg, #EAC95F 24.34%, #F1B151 77.78%)",
  borderRadius: "10px",
  "&:hover":{
    background: "linear-gradient(141.35deg, #EAC95F 24.34%, #F1B151 77.78%)",
    color:"#FFF",
  }
}

const Home = () => {
  return(
    <div className='homepage-1 overflow-hidden'>
      <Navigation />

      <div className='flex justify-end items-center overflow-hidden h-[400px] gap-1'>

        <svg width="10" height="237" viewBox="0 0 10 237" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="5.96597" y1="4.03375" x2="4.03376" y2="232.034" stroke="#101A1C" strokeWidth="8" strokeLinecap="round"/>
        </svg>

        <svg width="8" height="313" viewBox="0 0 8 313" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="4" y1="4" x2="3.99999" y2="309" stroke="#EEBC58" strokeWidth="8" strokeLinecap="round"/>
        </svg>

        <div className='bg-btn-bg w-[88%] relative bg-no-repeat bg-cover h-full'
          style={{
            backgroundImage: `url(${pic})`,
          }} 
        >
          <div className='flex flex-col justify-center items-start w-full h-full px-10 gap-3'>

            <div className="p-4 max-w-[650px] bg-white bg-opacity-10 backdrop-blur-lg rounded drop-shadow-lg text-white text-5xl font-bold text-left"> 
              Take a Chance and Win BIg<br/>
              With <span className='text-home-text'>KoboCard</span>
            </div>

            <Buttons variant='contained' style={btnStyles} text="Buy KoboCard" size='large'/>
          </div>
        </div>
      </div>
    <OngoingCardGames />
    <CountdownTimer CountdownTimestampMs={1672576160000}/>
    </div>
  )
}

export default Home
