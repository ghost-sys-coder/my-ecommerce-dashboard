import { Outlet, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";


const ProtectedLayout = () => {
    const { isAuthenticated, isUserLoading } = useAuthContext();


    if (isUserLoading) {
        return (
          <main className="min-h-screen flex justify-center items-center">
            <Loader size={100} className="text-white font-extrabold" />
          </main>
        );
    }
  return isAuthenticated ? (<Outlet />):(<Navigate to={"/login"} replace />)
}

export default ProtectedLayout