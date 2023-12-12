import { useState } from "react"
import { useGetUserGamesPerPageQuery} from "../../../app/api/authApiSlice"
import Loading from "../../Loading/Loading.Component"
// import usePagination from "./pageee"
import Pagination from "@mui/material/Pagination";
import ticket from "../../../assets/ticket.svg"
import emptyImage from "../../../assets/empty-image.jpg"
import { useNavigate } from "react-router-dom";




const KardDetails = ({ value }) => {
    const navigate = useNavigate()
    const content = value.map((game, index) => {
        return (
            <div key={index} className="md:py-6 py-2 md:px-16 flex justify-between rounded-xl shadow-lg">
                <img src={game.image? game.image : emptyImage} alt={game.title} className="w-[274px] h-[202px] object-cover rounded-md shadow-lg" />
                <div className="hidden text-center md:flex flex-col justify-around max-w-[230px]">
                    <span className="underline text-lg">Brief Description</span>
                    <span className="text-gray-400 ">{game.description.slice(0, 60) + "..."}</span>
                    <span className="text-kard-history-price text-2xl" >{game.price}</span>
                </div>

                <div className="flex flex-col justify-around items-center max-w-[287px] gap-2">
                    <div className="text-xmm md:text-base font-semibold">12-02-2022</div>
                    <div className="flex flex-col gap-1 border border-black">
                        <span className="text-xmm md:text-sm font-semibold p-1">Ticket</span>
                        <hr />
                        <span className="text-xsm md:text-xs p-1 md:p-2">{game.id}</span>
                    </div>
                    <div className="flex border border-black">
                        <span className="border-r border-black text-xsm md:text-xs p-1">status</span>
                        <span className="text-xsm md:text-xs p-1 text-green-700">{game.status}</span>
                    </div>
                    <button className="bg-More-info-btn text-xs p-1 w-[120px] text-white rounded-full" onClick={()=>{ navigate(`/card/:${game.id}`)}}>
                        More info
                    </button>
                </div>
            </div>
        )
    })


    return (
        <div className="w-[85%] mx-auto space-y-10">
            {content}
        </div>
    )
}


const KardPagenationComponent = ({ data, handleChange, page }) => {

    const count = Math.ceil(data.totalCount / 5);

    let pageContent =
        <div>
            <KardDetails value={data.games} />
            <div className="flex justify-center py-6">
                <Pagination count={count} size='medium' page={page} color='primary' onChange={handleChange} />
            </div>
        </div>;


    return pageContent
}

const KardHistory = () => {
    const gamesQueryParams = {
        currentPage: 1,
        itemsPerPage: 5
    }
    const [queryParams, setQueryParams] = useState(gamesQueryParams)
    //HandleChange function for the pagination component
    const handleChange = (e, p) => {
        setQueryParams({ ...queryParams, currentPage: p, }) }

        //Fetch data from api
        const { data, isLoading, isSuccess, error } = useGetUserGamesPerPageQuery(queryParams)

        //pass down the value
        let kardContent = isLoading ? (<div>
            <Loading />
        </div>) : isSuccess ? (
            <div className="w-full h-full font-inter py-12">
                <span className="py-6 text-lg md:text-4xl font-bold  text-black">Kard Game History</span>
                {
                    data.games.length > 0 ? <KardPagenationComponent data={data} handleChange={handleChange} page={queryParams.currentPage} /> :
                        <div className="flex flex-col gap-6 justify-center items-center">
                            <img src={ticket} alt="ticket" className="h-[400px] w-[400px]" />
                            <div classname="font-inter text-3xl">No games yet</div>
                        </div>
                }
            </div>
        ) : <h3>An error occurred...</h3>

        return kardContent


    }

    export default KardHistory;
