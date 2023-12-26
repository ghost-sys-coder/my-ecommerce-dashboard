import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaSun } from "react-icons/fa";
import { MdNotificationAdd, MdChatBubble } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [search, setSearch] = useState('');
  const { user } = useAuthContext();
 
  return (
    <header className="navbar">
      <div className="left">
        <Link to={"/"}>{user?.name}</Link>
      </div>
      <div className="search">
        <input
          type="search" name="search" id="search"
          placeholder="Search..."
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
        <FaSearch />
      </div>
      <nav className="right">
        <FaSun />
        <div>
          <MdNotificationAdd />
          <span>2</span>
        </div>
        <div>
          <MdChatBubble />
          <span>2</span>
        </div>
      </nav>
    </header>
  )
}

export default Navbar