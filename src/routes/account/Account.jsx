import { useGetUserDetailsQuery } from '../../app/api/authApiSlice';
import Info from "./Info";
import Loading from '../../components/Loading/Loading.Component';



function AccountPage() {
  const {
    data,
    isLoading,
    isSuccess,
    refetch,
  } = useGetUserDetailsQuery(1)


let dashBoardContent= isLoading?(<>
<Loading />
  </>):isSuccess?(<Info value={[data,refetch]}/>): 
  (<div>error fetching data ...</div>)

  return dashBoardContent
}
export default AccountPage

