import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { useGetCardGamesByIdQuery, usePayCardGamesByIdMutation, useGetUserWalletDetailsQuery } from "../../app/api/authApiSlice";
import Loading from "../../components/Loading/Loading.Component";
import Modal from "../../components/Modal/modal";


const Details = ({value, refetch}) =>{
    //Amount of Kard
    const {amount} = value

    //Id from parameters
    const {cardId} = useParams()
    const navigate = useNavigate()

    const id = cardId.substring(1)//To trim ":" from the id , which is passed by the parameters
    //Redux hooks
    const [pay] = usePayCardGamesByIdMutation()
    //Passed id as parameter , which is appended to end of the link
    const {data,isLoading,isSuccess,isError, error} = useGetCardGamesByIdQuery(id)
    //Rective Modal values
    const [msg, setMsg] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [errMsg, setErrMsg] = useState(false)

    const navigateToFundWalletPage = () => {
        navigate('/wallet')
    }

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
            if(err.status == 422){
                setErrMsg(true)
                navigateToFundWalletPage()
            }
        }
    }

    let content = isLoading?
    <Loading />
    :
    isSuccess?
    <div className="w-[60%] md:w-10/12 mx-auto">

        <div className="flex justify-start gap-12 h-[590px]">
        <img
        className="w-[590px] h-[590px] shadow-2xl rounded-sm"
        src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1147&q=80"  alt="pic" />
        <div className="h-full w-full flex flex-col justify-center items-start gap-4">
            <p className="text-lg font-semibold">Card title: <span className="text-lg  font-normal">{data.game.title}</span></p>
            <p className="text-lg font-semibold">Card Status: <span  className="text-lg text-register-btn  font-normal">{data.game.status}</span></p>
            <p className="text-lg font-semibold">Account Balance: <span  className="text-lg  font-normal">{amount}</span></p>
            <p className="text-lg font-semibold">Card fee: <span  className="text-lg  font-normal">{data.game.price}</span></p>
            <button
             className="w-[200px] hover:text-register-btn text-white border border-register-btn bg-register-btn hover:bg-white  rounded-lg  px-5 py-2.5 text-center mr-2 mb-2"
             onClick={onClickHandler}>Pay up!</button>
        </div>
         </div>
    </div>:<h3>{error}</h3>
    
    return(
        <div className="font-inter h-screen relative ">
            
            <div className="">
            <p className="text-3xl text-center my-6 font-semibold">Card Purchase Details</p>
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


    let content = isLoading?<Loading />:isSuccess?
    (<Details value={data.wallet} refetch ={refetch} />):console.log('error');

    return (
    <>
    {content}
    </>)

}

export default UserPay