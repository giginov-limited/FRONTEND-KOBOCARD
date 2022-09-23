import { useGetUserDetailsQuery } from "../../app/api/authApiSlice";


const Pic = ({user,styles}) => {
    const {picture} = user
    // console.log(height)
    return(
        <>
        <img src={picture} alt="" className="h-11 w-11 rounded-full"
           style={styles}  />
        </>
    )
    
}

const DisplayPicture = ({styles})=>{
    const {
        data,
        isLoading,
        isSuccess,
        isError,
      } = useGetUserDetailsQuery()
    
      
    
    
      let postContent = isLoading?(<>
      <div>loadingg</div>
      </>):isSuccess?(<Pic {...data} styles={styles} />):
      console.log(isError)
    
      return( <div>{postContent}</div>)
}

export default DisplayPicture
