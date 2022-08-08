import { useState } from "react";
import { useGetUserDetailsQuery } from "../../app/api/authApiSlice"
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
    <div>loadingg</div>
    </>):isSuccess?(<Use value={data.user}/>):
    console.log(isError)

    return( <div>{postContent}</div>)
  }
  export default FetchData