import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Loader2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { errorOptions, successOptions } from "../constants";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    fullname: '',
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

  const handleRegister = async (e) => {
    e.preventDefault();


    /** form validation */
    if (!credentials.email || !credentials.fullname || !credentials.password) {
      return toast.error("All fields are required!", errorOptions);
    }

    setLoading(true);
    try {
      const { data, status } = await axios.post('/api/auth/register', {
        name: credentials.fullname,
        email: credentials.email,
        password: credentials.password
      });
      console.log(data);
      toast.success('Registered successfully!', successOptions);
      if (status === 200) {
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      toast.error('Registration Failed!', errorOptions);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-[1440px] mx-auto p-10 flex justify-center items-center min-h-screen">
      <div className="form-container">
        <h1 className="title">Create an account!</h1>
        <form onSubmit={handleRegister}>
          <div className="input-container">
            <label htmlFor="fullname">Fullname:</label>
            <input type="text" name="fullname" id="fullname" value={credentials.fullname} onChange={handleChange}/>
          </div>
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
                <span>Register</span>
            )}
          </button>
        </form>
        <div className="form-links">
          <p>Already have an account?</p>
          <Link to={"/login"}>Click here!</Link>
        </div>
      </div>
      <Toaster />
    </main>
  )
}
