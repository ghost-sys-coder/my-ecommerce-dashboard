import { useState} from "react";
import { FaTimes } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { errorOptions, successOptions } from "../constants";
import { SubCategory } from "../components";


function Category() {
  const [openModel, setOpenModel] = useState(false);
  const [openSubModal, setOpenSubModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({
    category: "",
    description: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategoryInfo((values) => ({ ...values, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, status } = await axios.post("/api/categories/add", {
        category: categoryInfo.category,
        description: categoryInfo.description,
      });
      console.log({ data });
      if (status === 200) {
        toast.success("Category has been created!", successOptions);
        setCategoryInfo({
          category: "",
          description: "",
        });
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message, errorOptions);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="content">
      <div className="flex justify-between gap-5 flex-col sm:flex-row">
        <h1 className="text-2xl font-poppins text-light-1">Categories</h1>
        <button
          onClick={() => setOpenModel(true)}
          className="py-2 px-4 rounded-md cursor-pointer text-white bg-primary-500"
        >
          Add a new product category
        </button>
        {openModel && (
          <div className="fixed h-full top-0 left-0 right-0 bottom-0 z-20 bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10 flex flex-col gap-4 justify-center items-center">
            <div className="flex w-full justify-end items-center pr-3 fixed top-10">
              <FaTimes
                size={45}
                className="cursor-pointer text-white hover:text-primary-500"
                onClick={() => setOpenModel(false)}
              />
            </div>
            <div className="form-container">
              <h1 className="title">Create new Category</h1>
              <form onSubmit={handleCreate}>
                <div className="input-container">
                  <label htmlFor="category">Main Category:</label>
                  <span>
                    Such as{" "}
                    {"Men's Clothing, Women's Clothing, Electronics, Mobile"}
                  </span>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={categoryInfo.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="subCategory:">Sub Category:</label>
                  <span>Describe your category...</span>
                  <input
                    type="text"
                    name="description"
                    value={categoryInfo.description}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <div>
                      <Loader2 size={25} className="text-white font-poppins" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <span>Create Category</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-between gap-5 flex-col sm:flex-row sm:mt-10 mt-5">
        <h1 className="font-poppins text-[18px] text-light-1">Sub Categories</h1>
        <button
          onClick={()=> setOpenSubModal(true)}
          className="py-2 px-4 rounded-md cursor-pointer text-white bg-primary-500"
        >
          Add Sub category
        </button>
        {openSubModal && (
          <SubCategory
            setOpenSubModal={setOpenSubModal}
          />
        )}
      </div>

      <div className="products-slider">
        <h1 className="text-poppins text-light-1 text-xl sm:text-2xl py-10">Selected products by category...</h1>
      </div>
      <Toaster />
    </div>
  );
}

export default Category;
