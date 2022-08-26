import UserGames from "./UserGames";
import { useGetUserDetailsQuery } from "../../app/api/authApiSlice";


const Dashboard = () => {
    const {data, isLoading, isError, error, isSuccess,refetch} = useGetUserDetailsQuery();
  
    
    let content = (isLoading)?<h4>Loading...</h4>:
    (isSuccess)?(
      <div className='welcome'>
        <h2>welcome {data.user.first_name}</h2>
      </div>
    ):refetch();
  
    return (
      <div className='wrapper'>
      {content}
      <div className="top">
        <div className="card">
          <p>Getting Started</p>
          <p className='srt'>A brief guide on using KoboCard from A - Z</p>
          <button>More Info</button>
        </div>
        <div className="card">
          <p>Getting Started</p>
          <p className='srt'>A brief guide on using KoboCard from A - Z</p>
          <button>More Info</button>
        </div>
        <div className="card">
          <p>Getting Started</p>
          <p className='srt'>A brief guide on using KoboCard from A - Z</p>
          <button>More Info</button>
        </div>
      </div>
  
      <div className='card-games'>
        <span className='header-2'>All Card Games</span>
        <UserGames />
      </div>
      </div>
    )
  }

  export default Dashboard