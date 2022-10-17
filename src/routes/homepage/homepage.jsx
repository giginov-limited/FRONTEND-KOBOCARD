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
    <div className='homepage-1 overflow-hidden relative'>
      <Navigation /> 
      <div className='flex justify-end items-center h-[270px] md:h-[440px] gap-1 '>

      <svg width="10" className='hidden md:block' height="237" viewBox="0 0 10 237" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="5.96597" y1="4.03375" x2="4.03376" y2="232.034" stroke="#101A1C" strokeWidth="8" strokeLinecap="round"/>
      </svg>

      <svg width="8" height="313" className='hidden md:block' viewBox="0 0 8 313" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="4" y1="4" x2="3.99999" y2="309" stroke="#EEBC58" strokeWidth="8" strokeLinecap="round"/>
      </svg>

        <div className='relative w-full md:w-[88%] h-[270px] md:h-full shadow-lg' >
          <img src={pic} alt='' className='w-full  filter brightness-75 absolute bg-no-repeat bg-cover h-full object-fit md:object-cover rounded-b-2xl'/>
          <div className='absolute flex flex-col justify-start items-start w-full h-full px-10 py-14 tracking-wide md:py-10 gap-6 md:gap-6'>

            <div className="p-4 max-w-[650px] bg-white bg-opacity-20  rounded drop-shadow-lg text-white text-lg md:text-5xl font-bold text-left font-inter"> 
              Take a Chance and Win BIG<br/>
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
