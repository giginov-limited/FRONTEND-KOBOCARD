import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useGetCardGamesByIdQuery, usePayCardGamesByIdMutation, useGetUserWalletDetailsQuery } from "../../app/api/authApiSlice";
import './pay.styles.scss'


const Details = ({value}) =>{
    const {amount} = value
    const {cardId} = useParams()

    const id = cardId.substring(1)
    const [pay] = usePayCardGamesByIdMutation()
    const {data,isLoading,isSuccess,isError, error} = useGetCardGamesByIdQuery(id)
    const [msg, setMsg] = useState()

    useEffect(()=>{
        setTimeout(() => setMsg(null), 10000)
       },[msg])

    let messageHandler =
    <div className="message">

        <div className="message-box">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p>Paid</p>
        </div>
    </div> 
    

    const onClickHandler = async() =>{

        try {
            const res = await pay(id).unwrap()
            setMsg(messageHandler)
        }catch(err){
            console.log(err)
        }
    }

    let content = isLoading?<h2>...</h2>:
    isSuccess?
    <div className="pay-card">

         <div className="pay-card-1">
        <img src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80" className="image" alt="pic" />
        <div className="pay-card-details">
            <p>Card title: {data.game.title}</p>
            <p>Card Status: {data.game.status}</p>
            <p>Account Balance:{amount}</p>
            <p>Card fee:{data.game.price}</p>
            <button onClick={onClickHandler}>pay up!</button>
        </div>
         </div>
    </div>:<h3>{error}</h3>
    
    return(
        <div className="pay-wrapper">
            {msg}
            <p>Card Purchase Details</p>
            <div className="content">
            {content}
            </div>
        </div>
    )
}


// export default UserPay


const UserPay =()=>{
    const {data, isLoading,isSuccess} = useGetUserWalletDetailsQuery()

    let content = isLoading?<p>...</p>:isSuccess?(<Details value={data.wallet} />):console.log('error');

    return content

}

export default UserPay