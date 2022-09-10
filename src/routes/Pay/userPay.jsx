import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { useGetCardGamesByIdQuery, usePayCardGamesByIdMutation, useGetUserWalletDetailsQuery } from "../../app/api/authApiSlice";
import Modal from "../../components/Modal/modal";


const Details = ({value, refetch}) =>{
    const {amount} = value

    const {cardId} = useParams()

    const id = cardId.substring(1)
    const [pay] = usePayCardGamesByIdMutation()
    const {data,isLoading,isSuccess,isError, error} = useGetCardGamesByIdQuery(id)
    const [msg, setMsg] = useState()
    const [openModal, setOpenModal] = useState(false)

    useEffect(()=>{
        const timer = setTimeout(() => setOpenModal(false), 2500);
        return () => clearTimeout(timer)
       },[openModal])

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
            setOpenModal(true)
            refetch()
        }catch(err){
            console.log(err)
        }
    }

    let content = isLoading?<h2>...</h2>:
    isSuccess?
    <div className="w-[90%] md:w-10/12 mx-auto">

        <div className="flex justify-start gap-12 max-h-[200px]">
        <img
        className="w-[230px] h-[200px]"
        src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80"  alt="pic" />
        <div className="flex flex-col justify-evenly items-start text-base">
            <p>Card title: {data.game.title}</p>
            <p>Card Status: {data.game.status}</p>
            <p>Account Balance:{amount}</p>
            <p>Card fee:{data.game.price}</p>
            <button
             className="bg-btn-bg text-white py-2 rounded-sm px-4 cursor-pointer"
             onClick={onClickHandler}>Pay up!</button>
        </div>
         </div>
    </div>:<h3>{error}</h3>
    
    return(
        <div className="bg-BG font-inter h-screen relative ">
            
            <div className="">
            <p className="text-3xl text-center pt-4">Card Purchase Details</p>
            <div className="my-12">
            {content}
            </div>
            <Modal open={openModal} onClose={()=> setOpenModal(false)}/>
            </div>
        </div>
    )
}


const UserPay =()=>{
    const {data, isLoading,isSuccess, refetch} = useGetUserWalletDetailsQuery()


    let content = isLoading?<p>...</p>:isSuccess?
    (<Details value={data.wallet} {...refetch}/>):console.log('error');

    return (
    <>
    {content}
    </>)

}

export default UserPay