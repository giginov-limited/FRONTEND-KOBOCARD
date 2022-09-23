import { useGetUserWalletDetailsQuery,useFundWalltetMutation, useUpdateUserImageMutation } from "../../app/api/authApiSlice"
import { useSelector } from "react-redux/es/exports";
import Loading from "../../components/Loading/Loading.Component";
import { PaystackButton } from "react-paystack";
import { useState } from "react";

const Wallet = ({wallet}) =>{
    const [fund] = useFundWalltetMutation()
    const [Post] = useUpdateUserImageMutation()
    const {first_Name,email,phone} = useSelector((state) => state.auth.user)
    const name = first_Name;

    const publicKey = "pk_test_ed0b6e2c929757c360423079c25e4ca8f9a0c210";
    const [amount, setAmount] = useState(0)
    const { id,user_id} =wallet
    
    const onChange = (e) => {
        // num = e.target.value.toString()
        // console.log(num)
        setAmount(e.target.value.toString())
    }

    console.log(amount)

  
    const componentProps = {
      email,
      amount,
      metadata: {
        name,
        phone,
      },
      publicKey,
      className:"block bg-green-500 cursor-pointer p-2 my-4 rounded shadow-md text-white text-base",
      text: "Fund Wallet",
      onSuccess: () =>{
        const am = 
            {
                "amount": "20000"
           }
        // let id = user_id
        // Post({id,'picture_url':"https://res.cloudinary.com/kobocard/image/upload/v1662022505/z4pcf8hhdpt0l6dlauz4.jpg"}) 
        alert("Thanks for doing business with us! Come back soon!!")
      },
      onClose: () => alert("Wait! Don't leave :("),
    }

    //trying to run the function manaully here
    const handle = async() => {
        try{
            await fund({id,user_id,"amount":"20000"})
        }catch (err) {
            console.log(err)
        }
    }

    let content =  
        <div className="bg-BG h-screen">
            <div className="w-[214px] h-[149px] bg-dropdown-bg flex flex-col justify-evenly shadow-md ml-5">
                <p className="text-lg">Wallet</p>
                <p className="text-xl">&#8358; {wallet.amount}</p>
            </div>
            <p className="text-xl font-inter" onClick={handle}>Fund Wallet</p>
            <div className="bg-pay-bg w-[319px] h-[254px] mx-auto flex justify-center items-center shadow-lg">
                <div className="text-2xl font-inter flex flex-col gap-2 justify-start items-start">
                <label htmlFor='number' className="text-base">Amount:</label>
                <input 
                type='number'
                onChange={onChange}
                className='w-44'
                ></input>
                <PaystackButton {...componentProps} />
                </div> 
            </div>
        </div>

    return(
        <div>
            {content}
        </div>
    )
}

const UserWallet  = () => {
    const {data, isLoading, isSuccess,isError,error} = useGetUserWalletDetailsQuery()

    let content = isLoading?<Loading />:
    (isSuccess)?<Wallet {...data}/>:console.log(error)

    return (
        <>
        {content}
        </>
    )
}


export default UserWallet