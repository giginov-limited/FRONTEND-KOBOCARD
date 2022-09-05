import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { useGetCardGamesByIdQuery } from "../../app/api/authApiSlice";
import Countdown from "../../components/countDown/countdown";
import './card.style.scss'


const CardDescription = () => {
    const {cardId} = useParams();
    const id = cardId.substring(1)
    const {data} = useGetCardGamesByIdQuery(id)
    
    const [card, setCard] = useState('')

    useEffect(()=>{

        const fetchCarddetails = async() =>{
            try{
                const res = await axios.get(`http://kobo-card.herokuapp.com/users/getGameById/${id}`)
                setCard(res.data.game)
            }catch (err){
                console.log(err)
            }
        }
    
        fetchCarddetails();
    }, [''])
    

    return(
       <>
       <div className="bg-BG font-inter">
        <h2 className="text-2xl py-4">Card Game Desciption</h2>
        <div className="w-[90%] md:w-10/12 mx-auto flex gap-4 py-10">
            <div>
               <img src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80" className="image" alt="pic" />
               <div className="flex my-4 gap-6"> 
                   <div className='w-[256px] h-[143px] border border-black flex flex-col justify-evenly p-1 font-inter shadow-md rounded'>
                   <span>Card game starts</span>
                    <Countdown CountdownTimestampMs={card.start_time} />
                    <span>Card game ends</span>
                    <Countdown CountdownTimestampMs={card.end_time} />
                    </div>

                <div className='w-[256px] h-[143px] border border-black flex flex-col justify-between p-1 font-inter shadow-md rounded'>
                    <div className="pt-2 flex flex-col justify-around">
                     <span>{card.title}</span>
                      <span className='text-2xl mt-2'>
                        &#8358;
                        {card.price}</span>  
                    </div>
                      
                    <button
                    className="bg-btn-bg text-white py-2"
                    >Play Now</button>
                </div>
               </div>
            </div>
         <p>{card.description}</p>
        </div>
       </div>
       </>
    )
}

export default CardDescription