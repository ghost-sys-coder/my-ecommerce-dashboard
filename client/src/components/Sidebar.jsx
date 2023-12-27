import { Link, useNavigate } from "react-router-dom";
import { MdAdminPanelSettings, MdDashboard, MdHealthAndSafety, MdLogout, MdNotifications, MdCategory} from "react-icons/md";
import { FaChartBar, FaRegCreditCard, FaRegUser, FaStore, FaTruck, FaUserCircle } from "react-icons/fa";
import axios from 'axios';

import { useAuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { setIsAuthenticated, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const {status} = await axios.post('/api/auth/logout');
      if (status === 200) {
        setUser(undefined);
        setIsAuthenticated(false);
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="sidebar custom-scrollbar">
      <div className='container'>
        <h3>MAIN</h3>
        <ul>
          <li>
            <MdDashboard />
            <Link to={"/"}>Dashboard</Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <h3>LISTS</h3>
        <ul>
          <li>
            <FaRegUser />
            <Link to={"/users"}>Users</Link>
          </li>
          <li>
            <FaStore />
            <Link to={"/products"}>products</Link>
          </li>
          <li>
            <MdCategory />
            <Link to={"/category"}>Category</Link>
          </li>
          <li>
            <FaRegCreditCard />
            <Link to={"/orders"}>orders</Link>
          </li>
          <li>
            <FaTruck />
            <Link to={"/delivery"}>delivery</Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <h3>USEFUL</h3>
        <ul>
          <li>
            <FaChartBar />
            <Link to={"/stats"}>stats</Link>
          </li>
          <li>
            <MdNotifications />
            <Link to={"/notifications"}>Notifications</Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <h3>Service</h3>
        <ul>
          <li>
            <MdHealthAndSafety />
            <Link>system health</Link>
          </li>
          <li>
            <MdAdminPanelSettings />
            <Link to={"/settings"}>settings</Link>
          </li>
        </ul>
      </div>
      <div className="container">
        <h3>USER</h3>
        <ul>
          <li>
            <FaUserCircle />
            <Link to={"/profile"}>Profile</Link>
          </li>
        </ul>
      </div>
      <div onClick={handleLogout} className="flex gpa-2 items-center justify-start py-2 px-2 rounded-sm cursor-pointer hover:bg-primary-500">
        <MdLogout className="text-white font-bold text-2xl" />
        <span className="text-[16px] font-medium text-white">Logout</span>
      </div>
    </nav>
  )
}
