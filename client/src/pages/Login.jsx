
import { useState } from "react";
import { useNavigate, Link, } from "react-router-dom";
import axios from 'axios';
import { Loader2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { errorOptions, successOptions } from "../constants";

import { useAuthContext } from "../context/AuthContext";

export default function Login() {
  const { setIsAuthenticated, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setCredentials((values) => ({
      ...values, 
      [name]: value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, status } = await axios.post('/api/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      console.log(data);
      if (status === 200) {
        setUser(data);
        setIsAuthenticated(true);
        toast.success('Login Successful!', successOptions);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, errorOptions);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-[1440px] mx-auto p-10 flex justify-center items-center min-h-screen">
      <div className="form-container">
        <h1 className="title">Log into your to continue!</h1>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={credentials.email} onChange={handleChange} />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={credentials.password} onChange={handleChange} />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? (
              <div>
                <Loader2 size={25} className="text-white font-poppins" />
                <span>Loading...</span>
            </div>
            ) : (
                <span>Login</span>
            )}
          </button>
        </form>
        <div className="form-links">
          <p>{"Don't have an account?"}</p>
          <Link to={"/register"}>Click here!</Link>
        </div>
      </div>
      <Toaster />
    </main>
  )
}
