import { useGetAllCardGamesQuery } from '../../../app/api/authApiSlice';
import Countdown from '../../countDown/countdown';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading.Component';


const AllCardGames = () => {
    const {data, isLoading,isSuccess,isError} = useGetAllCardGamesQuery();
    const navigate = useNavigate()

    const navigateToCardsHandler = (id) =>{
        navigate(`/card/:${id}`)
    }
    const navigateToPayHandler = (id) =>{
        navigate(`/Pay/:${id}`)
    }

    let content = isLoading?<Loading />:
    isSuccess?(data.games.map((game)=> {

        const timeEnd = Number(game.end_time + '000');
        const startEnd = Number(game.start_time + '000');

    return(
          <div className='flex justify-evenly items-center gap-8 rounded my-5 py-6 px-3 w-full shadow-xl' key= {game.id}>
             <img className='max-h-[159px]' src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80" alt="pic" />
                <div className='h-[143px] flex flex-col justify-between p-1 font-inter gap-3'>
                    <div className='pt-2 flex flex-col justify-around items-start'>
                     <span className='text-xl font-semibold'>{game.title}</span>
                     <div>
                      <span className='text-register-btn text-lg'>Kard price: </span><span className='text-2xl font-bold mt-2 text-btn-bg'>&#8358;{game.price}</span>    
                     </div>
                    </div>

                    <div className='flex justify-between'>

                    <button
                     className=' text-black p-1 rounded-xl border border-register-btn'
                     onClick={() =>navigateToCardsHandler(game.id)}>More Info
                    </button>

                    <button
                    className='bg-btn-bg p-1 rounded-xl text-white py-2'
                    onClick={()=> navigateToPayHandler(game.id)}>Play Now</button>
                    </div>
                </div>

                <div className='w-[256px] h-[143px] flex flex-col justify-evenly p-1 font-inter'>
                    <span>Card game starts</span>
                    <Countdown CountdownTimestampMs={startEnd} />
                   <span>Card game ends</span>
                   <Countdown CountdownTimestampMs={timeEnd} />
                </div>
            </div>
    )
    })):<h5>error....</h5>


    return(
        <div className='flex flex-col justify-center items-center px-5'> 
        {content}
        </div>
    )
}

export default AllCardGames