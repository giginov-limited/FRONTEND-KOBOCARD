import { useParams } from "react-router-dom"
import { useGetCardGamesByIdQuery } from "../../app/api/authApiSlice";
import { useNavigate } from "react-router-dom";
import Countdown from "../../components/countDown/countdown";
import Loading from "../../components/Loading/Loading.Component";
import Buttons from "../../components/Button";

const style = {
    backgroundColor:"#008092",
    borderRadius: "100px",
    width: "150px",
    "&:hover":{
        backgroundColor:"#008092",
        opacity:0.9,
    }
}

const Info = (props) => {
    const {game,id} = props

    const navigate = useNavigate()

    const navigateToPayHandler = () =>{
        navigate(`/Pay/:${id}`)
    }

    return(
       <>
       <div className="font-inter">
        <h2 className="text-3xl font-semibold py-4">Card Game Desciption</h2>
        <div className="w-[90%] md:w-10/12 mx-auto flex flex-col md:flex-row gap-6 md:gap-12 py-10">
            <div className="w-full mx-auto md:w-full">
               <img src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80" className="w-full h-[172px] object-cover md:max-w-[590px] md:h-[509px]" alt="pic" />
            </div>
            <div>
                <p className="text-4xl font-bold text-left">{game.title}</p>
                <p className="text-sm md:text-xl font-light leading-10 text-left max-w-[617px] my-4 md:my-12">{game.description}</p>

                <div className="flex justify-center my-4 gap-10"> 
                <div className='w-full text-xs md:text-base md:w-[246px] flex flex-col justify-evenly p-1 font-inter shadow-md rounded'>
                <span>Card game starts</span>
                 <Countdown CountdownTimestampMs={game.start_time} />
                 <span> game ends</span>
                 <Countdown CountdownTimestampMs={game.end_time} />
                 </div>

             <div className='w-ful md:w-[246px] flex flex-col justify-between px-1 py-2 gap-4 md:gap-12 font-inter shadow-md rounded'>
                 <span className='text-base md:text-5xl mt-2 text-Fund-wallet font-semibold'>
                     &#8358;
                     {game.price}  
                 </span>
                 <div className='flex justify-center items-center'>
                 <Buttons variant="contained" text="Play Now" style={style} onClick={navigateToPayHandler}/>  
                 </div>
             </div>
            </div>
            </div>
        </div>
       </div>
       </>
    )
}


const CardDescription = () => {
    const {cardId} = useParams();
    const id = cardId.substring(1)
    const {data, isLoading, isSuccess,isError, error} = useGetCardGamesByIdQuery(id)

    let kardContent = 
    isLoading?<Loading />:
    isSuccess? <Info {...data} id={id}/>:
    isError?<p>{error}</p>:null;

    return kardContent
}

export default CardDescription