import { useState, useEffect, Fragment, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { errorOptions, successOptions } from "../constants";
import { ImageUploader } from "../components";

function Category() {
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState({
    category: "",
    description: "",
    imgUrl: "",
    parentCategory: ""
  });


  useEffect(() => {
    console.log(categoryInfo)
  }, [categoryInfo])
  
  const fetchCategories = useCallback(async () => {
    setIsDataLoading(true);
      try {
        const { data } = await axios.get("/api/categories");
        setCategories(data);
        setSelected(data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsDataLoading(false);
      }
  }, [])

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCategoryInfo((values) => ({ ...values, [name]: value }));
  };

  const handleImageSelect = (imageUrl) => {
    setCategoryInfo((prevCategoryInfo) => ({
      ...prevCategoryInfo,
      imgUrl: imageUrl
    }))
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, status } = await axios.post("/api/categories/add", {
        category: categoryInfo.category,
        description: categoryInfo.description,
        imgUrl: categoryInfo.imgUrl,
        parentCategory: selected._id
      });
      console.log({ data });
      if (status === 200) {
        toast.success("Category has been created!", successOptions);
        setCategoryInfo({
          category: "",
          description: "",
        });
        fetchCategories();
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

            <div className="sm:w-[500px] w-full p-2">
              {isDataLoading && categories.length === 0 ? (
                <Loader
                  size={70}
                  className="text-white font-bold text-center"
                />
              ) : (
                <>
                  <h1 className="text-light-1 font-poppins text-2xl pb-4 text-center">
                    Choose a parent category
                  </h1>
                  <Listbox value={selected || ""} onChange={setSelected}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selected?.category}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {categories.map((category) => (
                            <Listbox.Option
                              key={category._id}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-amber-900"
                                    : "text-gray-900"
                                }`
                              }
                              value={category}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {category.category}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </>
              )}
            </div>

            <div className="form-container">
              <h1 className="title">Create new Category</h1>
              <form onSubmit={handleCreate}>
                <div className="input-container">
                  <label htmlFor="category">Category:</label>
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
                  <label htmlFor="description:">Description:</label>
                  <span>Describe your category...</span>
                  <input
                    type="text"
                    name="description"
                    value={categoryInfo.description}
                    onChange={handleChange}
                  />
                </div>
                <ImageUploader btnText={"Upload Category Image"} onImageSelect={handleImageSelect}/>
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

      <div className="products-slider">
        <h1 className="text-poppins text-light-1 text-xl sm:text-2xl py-10">
          Selected products by category...
        </h1>
      </div>
      <Toaster />
    </div>
  );
}

export default Category;
