/* eslint-disable react/prop-types */
import { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { FaTimes } from "react-icons/fa";
import { Loader } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { errorOptions, successOptions } from "../constants";

// eslint-disable-next-line react/prop-types
function SubCategory({ setOpenSubModal }) {
  const [categories, setCategories] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [subCategory, setSubCategory] = useState({
    category: "",
    description: "",
    parentCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubCategory((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleCreateSubCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, status } = await axios.post(
        "/api/categories/add-subcategory",
        {
          category: subCategory.category,
          description: subCategory.description,
          parentCategory: selected._id,
        }
      );
      console.log({ data });
      if (status === 200) {
          toast.success("Sub category has been created!", successOptions);
          setSubCategory({
              category: '',
              description: '',
              parentCategory: ''
          })
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Create Category", errorOptions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
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
    };
    fetchCategories();
  }, []);

  return (
    <div className="h-full fixed top-0 left-0 right-0 bottom-0 w-full flex flex-col gap-4 items-center justify-center bg-gray-900 backdrop-filter backdrop-blur-sm bg-opacity-10 z-20">
      <div className="w-full flex justify-end items-center sm:px-10 fixed top-2">
        <FaTimes
          size={50}
          className="cursor-pointer text-light-1 hover:text-primary-500"
          onClick={() => setOpenSubModal(false)}
        />
      </div>
      <div className="sm:w-[500px] w-full p-2">
        {isDataLoading ? (
          <Loader size={70} className="text-white font-bold text-center" />
        ) : (
          <>
            <h1 className="text-light-1 font-poppins text-2xl pb-4 text-center">
              Choose a parent category
            </h1>
            <Listbox value={selected || ""} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected?.category}</span>
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
            <div className="form-container">
              <form onSubmit={handleCreateSubCategory}>
                <h1 className="text-xl font-medium text-center font-poppins text-light-1">
                  Create new Sub Category
                </h1>
                <div className="input-container">
                  <label htmlFor="category">Category:</label>
                  <span>
                    Such as Mobile, {"Men's Clothing, Women's Clothing"}
                  </span>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={subCategory.category}
                    placeholder="Product category"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="description">Description:</label>
                  <span>Provide a category description...</span>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Provide category description..."
                    value={subCategory.description}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" disabled={loading}>
                  {loading ? (
                    <div>
                      <Loader size={25} className="text-white font-poppins" />
                      <span>Creating Category...</span>
                    </div>
                  ) : (
                    <span>Create</span>
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SubCategory;
