import { useGetUserWalletDetailsQuery,useFundWalltetMutation, useUpdateUserImageMutation } from "../../app/api/authApiSlice"
import { useSelector } from "react-redux/es/exports";
import Loading from "../../components/Loading/Loading.Component";
import { PaystackButton } from "react-paystack";
import paystack from "../../assets/paystack.svg"
import { useState } from "react";

const Wallet = ({wallet}) =>{
    const [fund] = useFundWalltetMutation()
    const [Post] = useUpdateUserImageMutation()
    const {first_Name,email,phone} = useSelector((state) => state.auth.user)
    const name = first_Name;

    //Reactive variables to show user amount
    const [showAmount, setShowAmount] = useState(false)

    const publicKey = "pk_test_ed0b6e2c929757c360423079c25e4ca8f9a0c210";
    const [amount, setAmount] = useState(0)
    const { id,user_id} =wallet
    
    const onChange = (e) => {
        // num = e.target.value.toString()
        // console.log(num)
        setAmount(e.target.value.toString())
    }

  
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
    

    let content =  
        <div className="h-screen">
            <div className="w-[149px] h-[120px] md:w-[250px] md:h-[149px] bg-register-btn shadow-xl m-5 rounded-b-3xl ">
                <div className="bg-white w-full h-[100px] md:h-[120px] flex flex-col justify-evenly rounded-b-3xl">
                <p className="text-lg md:text-2xl font-semibold">Wallet Balance</p>

                {/* Show amount toggle function */}
                {
                    showAmount? 
                        <div className="flex justify-around items-center px-1 md:px-3">
                        <p className="text-xl md:text-3xl">&#8358; {wallet.amount}</p>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=> setShowAmount(!showAmount)}>
                          <g clipPath="url(#clip0_58_978)">
                            <path d="M15.0003 3.75C21.7403 3.75 27.3478 8.6 28.5241 15C27.3491 21.4 21.7403 26.25 15.0003 26.25C8.26031 26.25 2.65281 21.4 1.47656 15C2.65156 8.6 8.26031 3.75 15.0003 3.75ZM15.0003 23.75C17.5496 23.7494 20.0233 22.8835 22.0164 21.294C24.0095 19.7044 25.4039 17.4853 25.9716 15C25.4019 12.5166 24.0065 10.3 22.0136 8.71253C20.0207 7.12506 17.5482 6.26066 15.0003 6.26066C12.4524 6.26066 9.97992 7.12506 7.98703 8.71253C5.99414 10.3 4.59877 12.5166 4.02906 15C4.59668 17.4853 5.99116 19.7044 7.98424 21.294C9.97733 22.8835 12.451 23.7494 15.0003 23.75V23.75ZM15.0003 20.625C13.5085 20.625 12.0777 20.0324 11.0228 18.9775C9.96795 17.9226 9.37531 16.4918 9.37531 15C9.37531 13.5082 9.96795 12.0774 11.0228 11.0225C12.0777 9.96763 13.5085 9.375 15.0003 9.375C16.4922 9.375 17.9229 9.96763 18.9778 11.0225C20.0327 12.0774 20.6253 13.5082 20.6253 15C20.6253 16.4918 20.0327 17.9226 18.9778 18.9775C17.9229 20.0324 16.4922 20.625 15.0003 20.625ZM15.0003 18.125C15.8291 18.125 16.624 17.7958 17.21 17.2097C17.7961 16.6237 18.1253 15.8288 18.1253 15C18.1253 14.1712 17.7961 13.3763 17.21 12.7903C16.624 12.2042 15.8291 11.875 15.0003 11.875C14.1715 11.875 13.3767 12.2042 12.7906 12.7903C12.2046 13.3763 11.8753 14.1712 11.8753 15C11.8753 15.8288 12.2046 16.6237 12.7906 17.2097C13.3767 17.7958 14.1715 18.125 15.0003 18.125Z" fill="black"/>
                           </g>
                              <defs>
                            <clipPath id="clip0_58_978">
                            <rect width="30" height="30" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>

                        </div>:
                        <div className="flex justify-around items-center px-1 md:px-3">
                            <p className="text-xl md:text-3xl">&#8358; ***,***</p>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=> setShowAmount(!showAmount)}>
                            <g clipPath="url(#clip0_58_1061)">
                            <path d="M22.3528 24.1213C20.1543 25.5157 17.6037 26.2542 15.0003 26.25C8.26031 26.25 2.65281 21.4 1.47656 15C2.0141 12.0884 3.4786 9.42863 5.65156 7.41751L1.74031 3.51001L3.50906 1.74126L28.2578 26.4913L26.4891 28.2588L22.3516 24.1213H22.3528ZM7.41906 9.18751C5.72032 10.732 4.53696 12.761 4.02906 15C4.41943 16.7081 5.20314 18.3014 6.31782 19.6532C7.43249 21.0051 8.84735 22.078 10.4498 22.7866C12.0522 23.4953 13.7979 23.8201 15.5479 23.7352C17.298 23.6502 19.004 23.158 20.5303 22.2975L17.9953 19.7625C16.9162 20.4423 15.6381 20.7351 14.3706 20.5931C13.1032 20.451 11.9216 19.8824 11.0198 18.9805C10.1179 18.0787 9.54935 16.8972 9.40726 15.6297C9.26518 14.3623 9.55804 13.0841 10.2378 12.005L7.41906 9.18751ZM16.1428 17.91L12.0903 13.8575C11.8679 14.4237 11.8155 15.0425 11.9397 15.6379C12.0638 16.2334 12.3591 16.7797 12.7892 17.2099C13.2193 17.64 13.7656 17.9352 14.3611 18.0594C14.9566 18.1835 15.5754 18.1312 16.1416 17.9088L16.1428 17.91ZM26.0091 20.74L24.2203 18.9525C25.0559 17.7616 25.6508 16.419 25.9716 15C25.6319 13.5122 24.9931 12.1089 24.0942 10.8756C23.1954 9.64231 22.0551 8.60467 20.7427 7.82576C19.4303 7.04686 17.9732 6.54297 16.46 6.34471C14.9468 6.14646 13.4091 6.25798 11.9403 6.67251L9.96781 4.70001C11.5266 4.08751 13.2253 3.75001 15.0003 3.75001C21.7403 3.75001 27.3478 8.60001 28.5241 15C28.141 17.0821 27.2801 19.047 26.0091 20.74V20.74ZM14.6541 9.38501C15.4497 9.33584 16.2467 9.45634 16.9922 9.73853C17.7378 10.0207 18.4148 10.4581 18.9785 11.0218C19.5422 11.5855 19.9796 12.2625 20.2618 13.0081C20.544 13.7536 20.6645 14.5506 20.6153 15.3463L14.6528 9.38501H14.6541Z" fill="black"/>
                            </g>
                              <defs>
                              <clipPath id="clip0_58_1061">
                                <rect width="30" height="30" fill="white"/>
                              </clipPath>
                                </defs>
                            </svg>

                        </div>

                }
                </div>
            </div>

            <div className="w-[80%] h-[300px] mx-auto flex flex-col justify-center items-center shadow-2xl gap-12 px-12 py-6 max-w-[555px]">
            <p className="text-3xl font-semibold font-inter text-Fund-wallet">Fund Wallet</p>
                <div className="text-2xl font-inter flex flex-col gap-2 justify-start items-start">

                    <button className="bg-white flex justify-around gap-6 items-center py-2 px-4 rounded-full shadow-xl">
                        <img src={paystack} alt="" />
                        <div className="h-[27px] w-[27px] rounded-full bg-paystack-btn"></div>
                    </button>
                {/* <label htmlFor='number' className="text-base">Amount:</label>
                <input 
                type='number'
                onChange={onChange}
                className='w-44'
                ></input>
                <PaystackButton {...componentProps} /> */}
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