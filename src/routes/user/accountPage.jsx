import './accountpage.styles.scss'
import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';
import Info from "./Info";
import Loading from '../../components/Loading/Loading.Component';



function AccountPage() {
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUserDetailsQuery(1)


  let postContent = isLoading?(<>
<Loading />
  </>):isSuccess?(<Info value={[data,refetch]}/>):
  console.log(isError)

  return( <div>{postContent}</div>)
}
export default AccountPage

