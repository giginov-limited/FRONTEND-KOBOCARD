import { useGetAllCardGamesQuery } from '../../app/api/authApiSlice';
import Countdown from '../countDown/countdown';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading.Component';


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
          <div className='flex justify-center items-center gap-8 rounded my-5 p-3 max-w-[80%] bg-pay-bg shadow-lg' key= {game.id}>
             <img className='max-h-[159px]' src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80" alt="pic" />
                <div className='w-[256px] h-[143px] border border-black flex flex-col justify-between p-1 font-inter'>
                    <div className='flex flex-col'>
                    <span>Brief description</span>
                    <span>{game.description.substring(0,40)+ '...'} </span>
                    </div>
                    <button
                     className='bg-btn-bg text-white py-2'
                     onClick={() =>navigateToCardsHandler(game.id)}>More Info</button>
                </div>

                <div className='w-[256px] h-[143px] border border-black flex flex-col justify-evenly p-1 font-inter'>
                    <span>Card game starts</span>
                    <Countdown CountdownTimestampMs={startEnd} />
                   <span>Card game ends</span>
                   <Countdown CountdownTimestampMs={timeEnd} />
                </div>

                <div className="w-[256px] h-[143px] border border-black flex flex-col justify-between p-1 font-inter">
                    <div className='pt-2 flex flex-col justify-around'>
                     <span className=''>{game.title}</span>
                      <span className='text-2xl mt-2'>&#8358;{game.price}</span>    
                    </div>
                    <button
                    className='bg-btn-bg text-white py-2'
                    onClick={()=> navigateToPayHandler(game.id)}>Play Now</button>
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