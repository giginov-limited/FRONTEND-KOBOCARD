import { useState } from "react";
import { useGetUserDetailsQuery } from "../../app/api/authApiSlice"
import Loading from "../../components/Loading/Loading.Component";
import AccountPage from "./accountPage";

function Use({value}) {
    const [user, setUser] = useState(value)
    return (
        <h1>{user.first_name}</h1>
    )
}


function FetchData() {
    const {
      data,
      isLoading,
      isSuccess,
      isError,
      error,
    } = useGetUserDetailsQuery()


    let postContent = isLoading?(<>
    <Loading />
    </>):isSuccess?(<Use value={data.user}/>):
    console.log(isError)

    return( <div>{postContent}</div>)
  }
  export default FetchData