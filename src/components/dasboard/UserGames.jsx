import { useEffect } from "react"
import { useState } from "react"
import { useGetUserGamesQuery } from "../../app/api/authApiSlice"
import Pagination from "./pagenatio"
import './games.style.scss'



const FetchGames = ({value}) =>{

    console.log(value)

   const content = value.map((game) => {

    return(
        <div key={game.id} className="game-wrapper">
            <img src="#" alt="" />
            <div className="Box">
               <p> Brief description</p>
               <p>{game.description}</p>
                <button>More info</button>
            </div>
            <div className="Box">
                <p>{game.title}</p>
                <h3>{game.price}</h3>
               <p> Time of purchase</p>
               <p> 04/09/2022-09:40</p>
            
            </div> 
            <div className="Box">
                <p>card game starts in</p>
                <p>00:00:00:00</p>
                <p>Draw ends in</p>
                <p>00:04:25:54</p>
            </div>
        </div>
    )
   })


    return(
        <div>
            {content}
        </div>
    )
}

const UserGames = () => {
    const {data, isLoading, isSuccess, isError} = useGetUserGamesQuery()
    
    const [Games , setGames] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [postsperpage, setPostPerPage] = useState(8);

    useEffect(()=>{
        setGames(data?.games)
    },[isSuccess])

    const indexOfLastPost = currentPage * postsperpage;
    const indexOfFirstPost = indexOfLastPost - postsperpage;
    const currentPosts = Games.slice(indexOfFirstPost, indexOfLastPost);


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    let postContent = isLoading?(<>
        <div>loadingg</div>
        </>):isSuccess?(
            <>
        <FetchGames value={currentPosts}/>
        <Pagination postsPerPage={postsperpage} totalPosts={Games.length} paginate={paginate}/>
            </>
        ):
        console.log(isError);


    return(
        <> 
        {postContent}
        </>
    )
}

export default UserGames;