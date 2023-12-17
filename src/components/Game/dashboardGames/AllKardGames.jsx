import { useGetAllCardGamesByNameQuery, useGetAllCardGamesPerPageQuery, } from '../../../app/api/authApiSlice';
import { useState } from 'react';
import { Pagination, TextField } from '@mui/material';
import Countdown from '../../countDown/countdown';
import { useNavigate } from 'react-router-dom';
import Loading from '../../Loading/Loading.Component';
import Buttons from '../../Button';
import emptyImage from '../../../assets/empty-image.jpg'
import ErrorHandlerComponent from '../../../utils/errorHandlerComponent';
import searchNotFoundImage from '../../../assets/search.png'

const moreInfoStyle = {
  background: "#828282",
  borderRadius: "100px",
  padding: "5px 30px",
  "&:hover": {
    backgroundColor: "rgba(130, 130, 130, 0.9)"
  }
}

const playNowStyle = {
  border: "1px solid #05C718",
  borderRadius: "100px",
  padding: "5px 30px",
  color: "#05C718",
  "&:hover": {
    backgroundColor: "rgba(5, 199, 24, 0.1)",
    border: "1px solid #05C718",
    color: "#05C718"
  }
}

const btnStyles = {
  color: "#FFF",
  background: "linear-gradient(141.35deg, #EAC95F 24.34%, #F1B151 77.78%)",
  borderRadius: "10px",
  "&:hover": {
    background: "linear-gradient(141.35deg, #EAC95F 24.34%, #F1B151 77.78%)",
    color: "#FFF",
  }
}

const RenderAllCardGames = () => {
  const gamesQueryParams = {
    currentPage: 1,
    itemsPerPage: 5
  }
  const [queryParams, setQueryParams] = useState(gamesQueryParams)
  //HandleChange function for the pagination component
  const handleChange = (e, p) => {
    setQueryParams({ ...queryParams, currentPage: p, })
  }

  const { data, isLoading, isSuccess, error } = useGetAllCardGamesPerPageQuery(queryParams)
  const navigate = useNavigate()

  const navigateToCardsHandler = (id) => {
    navigate(`/card/:${id}`)
  }
  const navigateToPayHandler = (id) => {
    navigate(`/Pay/:${id}`)
  }

  let content = isLoading ? <Loading /> :
    isSuccess ? (data.games && data.games.length > 0 ?
      <div>
        {data.games.map((game) => {
          const timeEnd = Number(game.end_time + '000');
          const startEnd = Number(game.start_time + '000');

          return (
            <div className='flex items-start justify-evenly md:items-center gap-8 rounded my-5 py-6 px-3 w-full shadow-lg' key={game.id}>
              <div className='flex flex-col '>
                <img className='h-[150px] w-[120px] md:w-full md:max-h-[159px] object-cover' src={game.image ? game.image : emptyImage} alt="pic" />
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
                  <Buttons variant="contained" style={moreInfoStyle} text="More Info" onClick={() => navigateToCardsHandler(game.id)} size='small' />
                  <Buttons variant="outlined" style={playNowStyle} text="Play Now" onClick={() => navigateToPayHandler(game.id)} size='small' />
                </div>
              </div>

              <div className='hidden md:flex w-[256px] h-[143px]  md:flex-col justify-evenly p-1 font-inter text-xxs md:text-base'>
                <span>Card game starts</span>
                <Countdown CountdownTimestampMs={startEnd} />
                <span>Card game ends</span>
                <Countdown CountdownTimestampMs={timeEnd} />
              </div>
            </div>
          )
        })}
        <Pagination count={Math.ceil(data.totalCount / 5)} size='medium' page={queryParams.currentPage} color='primary' onChange={handleChange} />
      </div> : (<div className='flex flex-col gap-4'>
        <img src={searchNotFoundImage} alt='search-not-found' className='w-[150px] h-auto py-5' />
        <p className='text-lg font-inter capitalize'>No games...</p>
      </div>)) :
      <ErrorHandlerComponent error={error} />



  return (
    <div>
      {content}
    </div>
  )

}


const RenderAllUserSearchGames = ({ data, isLoading, isSuccess, handleChange, queryParams, error, isError }) => {

  const navigate = useNavigate()

  const navigateToCardsHandler = (id) => {
    navigate(`/card/:${id}`)
  }
  const navigateToPayHandler = (id) => {
    navigate(`/Pay/:${id}`)
  }


  let content = isLoading ? <Loading /> :
    isSuccess ? (data.games && data.games.length > 0 ?
      <div>
        {data.games.map((game) => {
          const timeEnd = Number(game.end_time + '000');
          const startEnd = Number(game.start_time + '000');

          return (
            <div className='flex items-start justify-evenly md:items-center gap-8 rounded my-5 py-6 px-3 w-full shadow-lg' key={game.id}>
              <div className='flex flex-col '>
                <img className='h-[150px] w-[120px] md:w-full md:max-h-[159px] object-cover' src={game.image ? game.image : emptyImage} alt="pic" />
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
                  <Buttons variant="contained" style={moreInfoStyle} text="More Info" onClick={() => navigateToCardsHandler(game.id)} size='small' />
                  <Buttons variant="outlined" style={playNowStyle} text="Play Now" onClick={() => navigateToPayHandler(game.id)} size='small' />
                </div>
              </div>

              <div className='hidden md:flex w-[256px] h-[143px]  md:flex-col justify-evenly p-1 font-inter text-xxs md:text-base'>
                <span>Card game starts</span>
                <Countdown CountdownTimestampMs={startEnd} />
                <span>Card game ends</span>
                <Countdown CountdownTimestampMs={timeEnd} />
              </div>
            </div>
          )
        })}
        <Pagination count={Math.ceil(data.totalCount / 5)} size='medium' page={queryParams.currentPage} color='primary' onChange={handleChange} />
      </div> :
      (<div className='flex flex-col gap-4'>
        <img src={searchNotFoundImage} alt='search-not-found' className='w-[150px] h-auto py-5' />
        <p className='text-lg font-inter capitalize'>No games...</p>
      </div>)) : isError ?
      <ErrorHandlerComponent error={error} /> :
      <div className='flex flex-col gap-4'>
        <img src={searchNotFoundImage} alt='search-not-found' />
        <p className='text-lg font-inter capitalize'>Search not found...</p>
      </div>



  return (
    <div>
      {content}
    </div>
  )

}




const AllCardGames = () => {
  const [searchGamesBool, setSearchGamesBool] = useState(false)

  const gamesQueryParams = {
    title: '',
    currentPage: 1,
    itemsPerPage: 5
  }
  const [queryParams, setQueryParams] = useState(gamesQueryParams)
  //HandleChange function for the pagination component
  const handleChange = (e, p) => {
    setQueryParams({ ...queryParams, currentPage: p, })
  }

  const { data, isLoading, isSuccess, error, isError } = useGetAllCardGamesByNameQuery(queryParams)



  return (
    <div className='flex flex-col justify-center items-center px-5'>
      <div className='flex justify-start items-center gap-4'>
        <TextField value={queryParams.title} type={"text"} variant='outlined' onChange={e => setQueryParams({ ...queryParams, title: e.target.value })} />
        <Buttons variant='contained' style={btnStyles} text="Search Game" size='large' onClick={(e) => { queryParams.title ? setSearchGamesBool(true) : setSearchGamesBool(false) }} />
      </div>

      <div>
        {searchGamesBool || queryParams.title ? <RenderAllUserSearchGames data={data} isLoading={isLoading} isSuccess={isSuccess} error={error} isError={isError} handleChange={handleChange} queryParams={queryParams} /> : <RenderAllCardGames />}
      </div>
    </div>
  )
}

export default AllCardGames
