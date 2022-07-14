import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

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