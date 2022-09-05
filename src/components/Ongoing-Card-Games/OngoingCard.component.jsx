import { useGetAllCardGamesQuery } from '../../app/api/authApiSlice';
import Loading from '../Loading/Loading.Component';
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


  let content = 
  isLoading?<Loading /> :
  isSuccess?
  (data.games.map((game)=>{

    return(
  <div className="bg-white text-black flex flex-col w-full h-[200px]  justify-around rounded-xl max-w-[275px] shadow-sm shadow-white"  key= {game.id}>
    <span>{game.title}</span>
    <span className='text-3xl font-semibold'>{game.price}</span>
    <div>
        <button 
        type="button" 
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={() =>navigateToCardsHandler(game.id)}
        >More Info</button>
        <button  
        className='hover:bg-gray-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        onClick={()=> navigateToPayHandler(game.id)} 
        >Play now</button>
    </div>
  </div>
    )
  }))
 :
 (console.log(error))

 

    return(
        <div className='bg-black p-10 my-12 font-inter'>
          <h2 className='text-white my-6 text-2xl '>ONGOING GAMES</h2>
          <div className='grid grid-cols-4 items-center gap-5 space-y-4 '>
          {content}
          </div>
        </div>
    )
}

export default OngoingCardGames;