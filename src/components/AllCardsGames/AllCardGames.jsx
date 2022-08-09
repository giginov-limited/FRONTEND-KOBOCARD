import './cards.style.scss'
import { useGetAllCardGamesQuery } from '../../app/api/authApiSlice';
import Countdown from '../countDown/countdown';
import { useNavigate } from 'react-router-dom';


const AllCardGames = () => {
    const {data, isLoading,isSuccess,isError} = useGetAllCardGamesQuery();
    const navigate = useNavigate()

    const navigateToCardsHandler = (id) =>{
        navigate(`/card/:${id}`)
    }

    let content = isLoading?<h3>loading games....</h3>:
    isSuccess?(data.games.map((game)=> {

        const timeEnd = Number(game.end_time + '000');
        const startEnd = Number(game.start_time + '000');
    return(
          <div className='Card-info' key= {game.id}>
             <img src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80" className="image" alt="pic" />
                <div className='box des'>
                    <div>
                    <span>Brief description</span>
                    <span>{game.description} </span>
                    </div>
                    <button onClick={() =>navigateToCardsHandler(game.id)}>More Info</button>
                </div>

                <div className='box evenly'>
                    <span>Card game starts</span>
                    <Countdown CountdownTimestampMs={startEnd} />
                   <span>Card game ends</span>
                   <Countdown CountdownTimestampMs={timeEnd} />
                </div>

                <div className="box">
                     <span>{game.title}</span>
                      <span className='price'>
                        &#8358;
                        {game.price}</span>    
                    <button>Play Now</button>
                </div>
            </div>
    )
    })):<h5>error....</h5>


    return(
        <div className='Card'> 
        {content}
        </div>
    )
}

export default AllCardGames