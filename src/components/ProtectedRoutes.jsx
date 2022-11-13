import { Outlet, useOutletContext } from "react-router"

const ProtectedRoutes = () => {
   const {isAuthenticated, setIsAuthenticated} = useOutletContext()

    
}

export default ProtectedRoutes