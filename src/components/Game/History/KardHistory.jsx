import { useState } from "react"
import { useGetUserGamesQuery } from "../../../app/api/authApiSlice"
import Pagination from "./pagenatio"
import Loading from "../../Loading/Loading.Component"



const KardDetails = ({value}) =>{

   const content = value.map((game) => {
    return(
        <div key={game.id} className="py-6 px-16 flex justify-between rounded-xl shadow-xl">
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
    
    //variable to store the current page index
    const [currentPage, setCurrentPage] = useState(1);
    //post per page
    const [postsperpage, setPostPerPage] = useState(4);

    //variable to get index of the last post in a page
    //Note these variables changes bases on the current page which is determine by the paginate func
    const indexOfLastPost = currentPage * postsperpage;
    //var for first post of a page
    const indexOfFirstPost = indexOfLastPost - postsperpage;
    //Var for the current post of a page
    let  currentPosts;
    if(games) {
         currentPosts = games.slice(indexOfFirstPost, indexOfLastPost);//Remeber to fix error, when there are zero card games
    }else{
         currentPosts = [];
    }

    //function to set the current page based on the indexes and algorithm in pagination
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }



    let pageContent = 
    <>
    <KardDetails value={currentPosts}/>
    <Pagination postsPerPage={postsperpage} totalPosts={games.length} paginate={paginate} currentPage={currentPage}/>
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
            <KardPagenationComponent {...data} />
            </div>
        ):<h3>{error}</h3>

    return kardContent

    
}

export default KardHistory;