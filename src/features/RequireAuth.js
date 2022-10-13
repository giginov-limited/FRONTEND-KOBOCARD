import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector, useDispatch} from "react-redux"
import { useGetUserDetailsQuery } from "../app/api/authApiSlice"
import { setUserDetails } from "./authSlice"
import { useEffect } from "react"
import { useState } from "react"
import Notifications from "../components/Notification"


const RequireAuth = () => {
    const {token,session} = useSelector((state)=> state.auth)
    const location = useLocation()
    const [open, setOpen] = useState(false)
    
    return (
        token
             ? <div>{session?<Notifications open={open} setOpen={setOpen} text={session} severity="error"/>:null } <Outlet /></div>
            : <Navigate to="sign-in" state={{ from: location }} replace /> 
    )
}
export default RequireAuth