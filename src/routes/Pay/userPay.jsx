import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { useGetCardGamesByIdQuery, usePayCardGamesByIdMutation, useGetUserWalletDetailsQuery } from "../../app/api/authApiSlice";
import Loading from "../../components/Loading/Loading.Component";
import TransitionsModal from "../../components/Modal";
import Buttons from "../../components/Button";


const Details = ({value, refetch}) =>{
    //Amount of Kard
    const {amount} = value
    const {cardId} = useParams()
    const id = cardId.substring(1)//To trim ":" from the id , which is passed by the parameters
    const navigate = useNavigate()
    
    const [pay] = usePayCardGamesByIdMutation()
    const {data,isLoading,isSuccess,isError, error} = useGetCardGamesByIdQuery(id)
    const [msg, setMsg] = useState()
    const [openModal, setOpenModal] = useState(false)
    const [errMsg, setErrMsg] = useState(false)

    const navigateToFundWalletPage = () => {
        navigate('/wallet')
    }

    useEffect(()=>{
        const timer = setTimeout(() => setOpenModal(false), 25000);
        return () => clearTimeout(timer)
    },[openModal])

    

    const onClickHandler = async() =>{

        try {
            const res = await pay(id).unwrap()
            setMsg(res.message)
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

    const style = {
        backgroundColor:"#008092",
        borderRadius: "100px",
        width: "150px",
        "&:hover":{
            backgroundColor:"#008092",
            opacity:0.9,
        }
    }

    let content = 
    isLoading?
    <Loading />:
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
            <Buttons variant={"contained"} text="Pay" style={style} onClick={onClickHandler}/>
        </div>
         </div>
    </div>:
    <h3>An error occured;</h3>
    
    return(
        <div className="font-inter h-screen relative ">
            
            <div className="">
            <p className="text-3xl text-center my-6 font-semibold">Card Purchase Details</p>
            <div className="my-12">
            {content}
            </div>
            <TransitionsModal open={openModal} handleClose={()=> setOpenModal(false)} id={id} message={msg} />
            </div>
        </div>
    )
}


const UserPay =()=>{
    const {data, isLoading,isSuccess, refetch,isError} = useGetUserWalletDetailsQuery()


    let content = isLoading ? <Loading />:
    isSuccess?(<Details value={data.wallet} refetch ={refetch} />):<h3>{isError}</h3>;

    return content

}

export default UserPay