import { Link, useLocation } from "react-router-dom";
import { FaStore,FaUser,FaTruck, FaRegCreditCard, FaHome } from "react-icons/fa";
import { MdCategory } from "react-icons/md";



function MobileNav() {
    const { pathname } = useLocation();
  return (
      <nav className="mobile_bottom-nav">
          <Link
              className={pathname === "/" ? "active-link" : "inactive-link"}
              to={"/"}>
              <FaHome />
              <span>Home</span>
          </Link>  
          <Link
              className={pathname === "/users" ? "active-link" : "inactive-link"}
              to={"/users"}>
              <FaUser />
              <span>Users</span>
          </Link>
          <Link
              className={pathname === "/products" ? "active-link" : "inactive-link"}
              to={"/products"}>
              <FaStore />
              <span>Products</span>
          </Link>
          <Link
              className={pathname === "/category" ? "active-link" : "inactive-link"}
              to={"/category"}>
              <MdCategory />
              <span>Category</span>
          </Link>
          <Link
              className={pathname === "/delivery" ? "active-link" : "inactive-link"}
              to={"/delivery"}>
              <FaTruck />
              <span>Deliveries</span>
          </Link>
          <Link
              className={pathname === "/orders" ? "active-link" : "inactive-link"}
              to={"/orders"}>
              <FaRegCreditCard />
              <span>Orders</span>
          </Link>
    </nav>
  )
}

export default MobileNav