import { useGetAllCardGamesQuery } from '../../../app/api/authApiSlice';
import Loading from '../../Loading/Loading.Component';
import { useNavigate } from 'react-router-dom';

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
  isSuccess?
  (data.games.map((game)=>{

    colors.forEach((e)=>{
      // console.log( Math.random())
    })

    return(
  <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 h-[200px] rounded-2xl w-full shadow-lg"  key= {game.id}>
    <div className='bg-white rounded-2xl h-[180px] w-full  text-black  p-2 '>
      <div className='w-[80%] h-full flex flex-col justify-around items-start mx-auto '>
    <span className={``}>{game.title}</span>
    <span className='text-3xl font-semibold'>{game.price}</span>
    <div className='flex justify-between w-full px-1'>
        <button 
        type="button" 
        className="text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 hover:bg-gradient-to-br font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2"
        onClick={() =>navigateToCardsHandler(game.id)}
        >More Info</button>
        <button  
        className='font-medium rounded-full text-play-btn text-sm px-5 py-2 text-center mr-2 mb-2 border border-play-btn hover:bg-play-btn hover:border-white hover:text-white'
        onClick={()=> navigateToPayHandler(game.id)} 
        >Play now</button>
    </div>
      </div>
    </div>
  </div>
    )
  }))
 :
 (console.log(error))

 

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