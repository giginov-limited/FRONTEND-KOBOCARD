import { useGetAllCardGamesQuery } from '../../../app/api/authApiSlice';
import Countdown from '../../countDown/countdown';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading.Component';
import Buttons from '../../Button';

const moreInfoStyle =  {
    background: "#828282",
    borderRadius: "100px",
    padding:"5px 30px",
    "&:hover":{
      backgroundColor:"rgba(130, 130, 130, 0.9)"
    }
  }
  
  const playNowStyle =  {
    border: "1px solid #05C718",
    borderRadius: "100px",
    padding:"5px 30px",
    color:"#05C718",
    "&:hover":{
      backgroundColor:"rgba(5, 199, 24, 0.1)",
      border: "1px solid #05C718",
      color:"#05C718"
    }
  }


const AllCardGames = () => {
    const {data, isLoading,isSuccess,isError} = useGetAllCardGamesQuery();
    const navigate = useNavigate()

    const navigateToCardsHandler = (id) =>{
        navigate(`/card/:${id}`)
    }
    const navigateToPayHandler = (id) =>{
        navigate(`/Pay/:${id}`)
    }

    let content = 
    isLoading? <Loading />:
    isSuccess?( data.games ?
        data.games.map((game)=> {

            const timeEnd = Number(game.end_time + '000');
            const startEnd = Number(game.start_time + '000');
        
        return(
              <div className='flex items-start justify-evenly md:items-center gap-8 rounded my-5 py-6 px-3 w-full shadow-lg' key= {game.id}>
              <div className='flex flex-col '>
              <img className='h-[150px] w-[120px] md:w-full md:max-h-[159px] object-cover' src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80" alt="pic" />
              <div className='bg-btn-bg w-full block md:hidden'>
                <span className='text-sm md:text-2xl font-bold mt-2 text-white '>&#8358;{game.price}</span>    
             </div>
              </div>
                    <div className='h-full md:h-[143px] flex flex-col justify-evenly md:justify-between p-1 font-inter lg:gap-3'>
                        <div className='pt-2 flex flex-col justify-around items-start'>
                         <span className='text-sm md:text-xl font-semibold'>{game.title}</span>
                         <div className='hidden md:block'>
                          <span className='text-register-btn text-lg'>Kard price: </span><span className='text-2xl font-bold mt-2 text-btn-bg'>&#8358;{game.price}</span>    
                         </div>
                        </div>

                        <div className='justify-self-start flex  flex-col justify-evenly sel p-1 font-inter text-xmm md:text-base md:hidden'>
                        <span>Card game starts</span>
                        <Countdown CountdownTimestampMs={startEnd} />
                        <span>Card game ends</span>
                        <Countdown CountdownTimestampMs={timeEnd} />
                        </div>
        
                        <div className='flex justify-between gap-3'>
                        <Buttons variant="contained" style={moreInfoStyle} text="More Info" onClick={() =>navigateToCardsHandler(game.id)} size='small'/>
                        <Buttons variant="outlined" style={playNowStyle} text="Play Now" onClick={()=> navigateToPayHandler(game.id)} size='small'/>
                        </div>
                    </div>
        
                    <div className='hidden md:flex w-[256px] h-[143px]  md:flex-col justify-evenly p-1 font-inter text-xxs md:text-base'>
                        <span>Card game starts</span>
                        <Countdown CountdownTimestampMs={startEnd} />
                        <span>Card game ends</span>
                        <Countdown CountdownTimestampMs={timeEnd} />
                    </div>
                </div>
        )})
    :
    <h4> No Games</h4>):
    <h5>An Error Occured</h5>


    return(
        <div className='flex flex-col justify-center items-center px-5'> 
        {content}
        </div>
    )
}

export default AllCardGames
