import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

import { useAuthContext } from "../context/AuthContext";
import { Loader } from "lucide-react";
import { useEffect } from "react";

const Layout = () => {
  const { isUserLoading, fetchUserProfile, isAuthenticated } =
    useAuthContext();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  if (isUserLoading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <Loader size={100} className="text-white font-extrabold" />
      </main>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <main className="max-w-[1440px] mx-auto min-h-screen flex">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <Outlet />
          </div>
          <MobileNav />
        </main>
      ) : (
        <Navigate to={"/login"} replace={true} />
      )}
    </>
  );
};

export default Layout;
