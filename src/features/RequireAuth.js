import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { useGetUserDetailsQuery } from "../app/api/authApiSlice"
import { setUserDetails } from "./authSlice"
import { useEffect } from "react"


const RequireAuth = () => {
    const token = useSelector((state)=> state.auth.token)
    const location = useLocation()

    return (
        token
            ? <Outlet />
            : <Navigate to="sign-in" state={{ from: location }} replace /> 
    )
}
export default RequireAuth