import { useGetAllCardGamesQuery } from '../../../app/api/authApiSlice';
import Loading from '../../Loading/Loading.Component';
import { useNavigate } from 'react-router-dom';
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

const OngoingCardGames = () =>{
  const {data,isLoading,isSuccess,isError,error} = useGetAllCardGamesQuery()
  
  const navigate = useNavigate()

  const navigateToCardsHandler = (id) =>{
      navigate(`/card/:${id}`)
  }
  const navigateToPayHandler = (id) =>{
      navigate(`/Pay/:${id}`)
  }

  const colors = ["red","blue","green"]


  let content = 
  isLoading?<Loading /> :
  isSuccess?( data.games?
    data.games.map((game)=>{


      return(
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 h-[200px] rounded-2xl w-full shadow-lg"  key= {game.id}>
        <div className='bg-white rounded-2xl h-[180px] w-full  text-black  p-2 '>
          <div className='w-[80%] h-full flex flex-col justify-around items-start mx-auto '>
            <span className={``}>{game.title}</span>
            <span className='text-3xl font-semibold'>{game.price}</span>
            <div className='flex justify-between w-full'>
            <Buttons variant="contained" style={moreInfoStyle} text="More Info" onClick={() =>navigateToCardsHandler(game.id)} size='small'/>
            <Buttons variant="outlined" style={playNowStyle} text="Play Now" onClick={()=> navigateToPayHandler(game.id)} size='small'/>
          </div>
        </div>
      </div>
    </div>
      )
    }): <h3>No Games </h3>)

 : <h3>{error}</h3>

 

    return(
        <div className='bg-homeGames-bg p-10 my-12 font-inter'>
          <h2 className='text-white my-6 text-4xl '>ONGOING GAMES</h2>
          <div className='grid grid-cols-3 items-center gap-36 space-y-4 justify-items-center'>
          {content}
          </div>
        </div>
    )
}

export default OngoingCardGames;

