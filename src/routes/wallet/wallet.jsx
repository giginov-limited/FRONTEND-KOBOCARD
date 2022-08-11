import userEvent from "@testing-library/user-event"
import './wallet.style.scss';
import { useGetUserWalletDetailsQuery } from "../../app/api/authApiSlice"

const UserWallet = () =>{

    const {data, isLoading, isSuccess,isError,error} = useGetUserWalletDetailsQuery()
    console.log(data)

    let content = isLoading?<h2>...</h2>:
    (isSuccess)?
    
        <div className="wrapper-wallet">
            <div className="container">
                <p>Wallet</p>
                <p>&#8358; {data.wallet.amount}</p>
             </div>
            <p className="fund">Fund Wallet</p>
            <div className="py">
                <p>
                PayStack 
                </p> 
            </div>
        </div>
        
        :<h2>{error}</h2>

    return(
        <div>
            {content}
        </div>
    )
}

export default UserWallet