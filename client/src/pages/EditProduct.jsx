import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { DropDownList } from "../components";


const EditProduct = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[3];
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState('');


  useEffect(() => {
    const fetchProduct = async () => {
      setIsProductLoading(true);
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setSelected(data?.category)
      } catch (error) {
        console.log(error);
      } finally {
        setIsProductLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  return (
    <div className="content">
      {isProductLoading ? (
      <div className="h-screen flex justify-center items-center">
      <Loader2 size={70} className="font-poppins text-light-1" />
      <p className="font-poppins text-light-1">Loading Product...</p>
    </div>
      ) : (
          <>
            <h1 className="title">Edit Product!</h1>
            <div className="product_form-container">
              <form>
                <div className="input-container">
                  <label htmlFor="category">Product Category:</label>
                </div>
              </form>
            </div>
          </>
      )}
      <Toaster />
    </div>
  )
}

export default EditProduct