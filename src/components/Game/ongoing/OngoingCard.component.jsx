import { useGetAllCardGamesPerPageQuery } from '../../../app/api/authApiSlice';
import Loading from '../../Loading/Loading.Component';
import { useNavigate } from 'react-router-dom';
import Buttons from '../../Button';
import noGamesIcon from '../../../assets/NoGamesIcon.png'
import { useState } from 'react';
import { Pagination } from '@mui/material';

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
  const gamesQueryParams = {
    currentPage:1,
    itemsPerPage:3
  }
  const [queryParams, setQueryParams] = useState(gamesQueryParams)
  //HandleChange function for the pagination component
  const handleChange = (e,p) => {
      setQueryParams({...queryParams,currentPage: p,})
  }

  const {data , isLoading, isSuccess} = useGetAllCardGamesPerPageQuery(queryParams)

  
  const navigate = useNavigate()

  const navigateToCardsHandler = (id) =>{
      navigate(`/card/:${id}`)
  }
  const navigateToPayHandler = (id) =>{
      navigate(`/Pay/:${id}`)
  }



  let content = 
  isLoading?<Loading /> :
  isSuccess?( data.games?
    <div className='flex flex-col justify-center items-center py-6'>
      <div className='w-full grid grid-cols-2 md:grid-cols-3 items-center gap-4 md:gap-36 md:space-y-4 justify-items-center px-1 py-4 md:p-5'>{
        data.games.map((game)=>{
          return(
            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 h-[140px] md:h-[200px] rounded-2xl w-full xl:max-w-[500px] shadow-lg"  key= {game.id}>
              <div className='bg-white rounded-2xl h-[120px] md:h-[180px] w-full xl:max-w-[500px]  text-black  p-2 '>
                <div className='w-[95%] md:w-[80%] h-full flex flex-col justify-around items-start mx-auto '>
                  <span className='text-xmm md:text-xs font-bold'>{game.title}</span>
                  <span className='text-base md:text-3xl font-semibold'>&#8358; {Number(game.price).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <div className='flex justify-between w-full gap-4 md:gap-0'>
                  <Buttons variant="contained" style={moreInfoStyle} text="More Info" onClick={() =>navigateToCardsHandler(game.id)} size='small'/>
                  <Buttons variant="outlined" style={playNowStyle} text="Play Now" onClick={()=> navigateToPayHandler(game.id)} size='small'/>
                </div>
              </div>
            </div>
          </div>
          )
        })
      }
      </div>
      <Pagination count={Math.ceil(data.totalCount / 3)} size='medium' page={queryParams.currentPage} color='primary' onChange={handleChange}/>
    </div>:  
    <div className='flex justify-center items-center flex-col md:flex-row '>
      <img src={noGamesIcon} alt='noGamesIcon' className='object-cover max-w-[470] h-full max-h-[359px] '/>
      <div className='self-center text-left font-inter font-semibold text-lg md:text-4xl  text-white'>
        <p>Ooops!!</p>
        <p>No Ongoing Games.</p>
        <p>Please check back...</p>
      </div>
    </div>)

 : <div className='flex justify-center items-center flex-col md:flex-row '>
    <img src={noGamesIcon} alt='noGamesIcon' className='object-cover max-w-[470] h-full max-h-[359px] '/>
    <div className='w-full mx-auto self-center text-left font-inter font-semibold text-lg md:text-4xl  text-white'>
      <p>Ooops!!</p>
      <p>There's something wrong with your network.</p>
      <p>Please check back...</p>
    </div>
 </div>

 

    return(
        <div className='bg-homeGames-bg  -my-3 md:my-12 font-inter'>
          <h2 className='text-white my-6 text-lg md:text-4xl px-1 py-4 md:p-5'>ONGOING GAMES</h2>
          {content}
        </div>
    )
}

export default OngoingCardGames;
