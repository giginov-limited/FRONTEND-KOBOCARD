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
    console.log(data)
    
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
       <div className="card">
        <h2>Card Game Desciption</h2>
        <div className="details">
            <div>
         <img src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80" className="image" alt="pic" />
         <div className="flex-box"> 
         <div className='box evenly'>
                <span>Card game starts</span>
                <Countdown CountdownTimestampMs={card.start_time} />
                <span>Card game ends</span>
                <Countdown CountdownTimestampMs={card.end_time} />
        </div>

        <div className="box">
                     <span>{card.title}</span>
                      <span className='price'>
                        &#8358;
                        {card.price}</span>    
                    <button>Play Now</button>
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