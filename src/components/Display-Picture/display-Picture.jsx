import { useGetUserDetailsQuery } from "../../app/api/authApiSlice";


const Pic = ({user}) => {
    const {picture} = user
    return(
        <>
        <img src={picture} alt="" className="h-12 w-12 rounded-full" />
        </>
    )
    
}

const DisplayPicture = ()=>{
    const {
        data,
        isLoading,
        isSuccess,
        isError,
      } = useGetUserDetailsQuery()
    
    
      let postContent = isLoading?(<>
      <div>loadingg</div>
      </>):isSuccess?(<Pic {...data}/>):
      console.log(isError)
    
      return( <div>{postContent}</div>)
}

export default DisplayPicture
