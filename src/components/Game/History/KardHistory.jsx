import { useState } from "react"
import { useGetUserGamesQuery } from "../../../app/api/authApiSlice"
import Loading from "../../Loading/Loading.Component"
import usePagination from "./pageee"
import Pagination from "@mui/material/Pagination";
import ticket from "../../../assets/ticket.svg"




const KardDetails = ({value}) =>{
    // value.map((v)=>console.log(v))
   const content = value.map((game,index) => {
    return(
        <div key={index} className="py-6 px-16 flex justify-between rounded-xl shadow-lg">
            <img src={game.image} alt={game.title} className="w-[274] h-[202] rounded-md shadow-lg"/>
            <div className="text-center flex flex-col justify-around max-w-[230px]">
                <span className="underline text-lg">Brief Description</span>
                <span className="text-gray-400 ">{game.description.slice(0,60) + "..."}</span>
                <span className="text-kard-history-price text-2xl" >{game.price}</span>
            </div>
            <div className="flex flex-col justify-around items-center max-w-[287px] gap-2">
                    <div className="font-semibold">12-02-2022</div>
                    <div className="flex flex-col gap-1 border border-black">
                        <span className="text-sm font-semibold p-1">Ticket</span>
                        <hr />
                        <span className="text-xs p-2">{game.id}</span>
                    </div>
                    <div className="flex border border-black">
                        <span className="border-r border-black text-xs p-1">status</span>
                        <span className="text-xs p-1 text-green-700">{game.status}</span>
                    </div>
                    <button className="bg-More-info-btn text-xs p-1 w-[120px] text-white rounded-full">
                        More info
                    </button>
            </div>
        </div>
    )
   })


    return(
        <div className="w-[85%] mx-auto space-y-10">
            {content}
        </div>
    )
}


const KardPagenationComponent = ({games}) => {
    const [page,setPage] = useState(1)
    const perpage = 4

    const count = Math.ceil(games.length / perpage);
    const _DATA = usePagination(games, perpage);
  
    const handleChange = (e, p) => {
      setPage(p);
      _DATA.jump(p);
    };



    let pageContent = 
    <>
    <KardDetails value={_DATA.currentData()}/>
    <div className="flex justify-center py-6">
    <Pagination count={count} size="large" page={page} color='primary' onChange={handleChange}/>
    </div>
    </>;


    return pageContent
}

const KardHistory  = () => {

    //Fetch data from api
    const {data, isLoading, isSuccess, isError, error} = useGetUserGamesQuery()

    //pass down the value
    let kardContent = isLoading?(<>
        <Loading />
        </>):isSuccess?(
            <div className="w-full h-full font-inter py-12">
            <span className="py-6 text-4xl font-bold  text-black">Kard Game History</span> 
            {
                data.games > 0 ? <KardPagenationComponent {...data} />:
                <div className="flex flex-col gap-6 justify-center items-center">
                <img src={ticket} alt="ticket" className="h-[400px] w-[400px]"/>
                <div classname="font-inter text-3xl">No games yet</div>
                </div>
            }
            </div>
        ):<h3>{error}</h3>

    return kardContent

    
}

export default KardHistory;
