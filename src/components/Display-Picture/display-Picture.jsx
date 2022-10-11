import { useGetUserDetailsQuery } from "../../app/api/authApiSlice";
import Loading from '../Loading/Loading.Component'


const Pic = ({user,styles}) => {
    const {picture} = user
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
      <Loading />
      </>):isSuccess?(<Pic {...data} styles={styles} />):
      console.log(isError)
    
      return( <div>{postContent}</div>)
}

export default DisplayPicture
