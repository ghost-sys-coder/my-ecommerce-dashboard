import { Routes, Route } from "react-router-dom";
import axios from "axios";
import {
  Home,
  Login,
  Register,
  Products,
  Users,
  Orders,
  Product,
  User,
  Category,
  AddProduct,
  Delivery,
  EditProduct
} from "./pages";
import { Layout } from "./components";

import ProtectedRoute from "./components/ProtectedRoute";


const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
  axios.defaults.withCredentials = true;
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="products/new/create" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route path="category" element={<Category />} />
        <Route path="orders" element={<Orders />} />
        <Route path="delivery" element={<Delivery />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
