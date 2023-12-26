import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

import { errorOptions, successOptions } from "../constants/index.js";
import { calculateTime } from "../lib/functions.js";
import { useAuthContext } from "../context/AuthContext.jsx";

export default function Product() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const [product, setProduct] = useState(null);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");

  const {
    user: { Admin },
  } = useAuthContext();

  /** delete product */
  const handleDeleteProduct = async ()=> {
    try {
      const { status, data: {message} } = await axios.delete(`/api/products/${id}`);
      toast.success(message, successOptions);
      if (status === 200) {
        setTimeout(() => {
          navigate('/products');
        }, [2000])
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to product!', errorOptions);
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setIsProductLoading(true);
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        console.log({ data });
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsProductLoading(false);
      }
    };
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
        <div className="text-light-1">
          <div className="flex gap-2 justify-between items-center mb-10">
            <h1 className="font-poppins text-xl">{product?.title}</h1>
            {Admin && (
              <Link
                className="text-2xl font-poppins text-primary-600"
                to={`/products/edit/${id}`}
              >
                <FaEdit />
              </Link>
            )}
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {product?.images.map((imageUrl, index) => (
              <div className="h-[200px] rounded-md overflow-hidden" key={index}>
                <img
                  src={imageUrl}
                  alt="product"
                  className="w-[100%] h-[100%] object-cover"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-start items-center gap-3 py-3">
            <h3 className="text-xl font-poppins">Product Category:</h3>
            <p className="text-primary-600 font-poppins">{product?.category}</p>
          </div>
          <div className="mt-2">
            <h3 className="text-xl font-poppins">Product Description:</h3>
            <div
              className="text-sm pt-5 font-mono flex flex-col gap-2 pl-4"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </div>
          <div className="">
            <p className="py-2">Product Colors</p>
            {product?.colors?.split(",").map((color, index) => (
              <div
                key={index}
                style={{
                  width: 100,
                  height: 30,
                  borderRadius: 10,
                  backgroundColor: color,
                  border: "1px solid teal",
                  marginTop: 10,
                }}
              />
            ))}
          </div>
          <div className="mt-3">
            <h3 className="font-poppins">Product Details:</h3>
            <p className="font-mono">
              Product price:{" "}
              <span className="text-primary-600">{product?.price}</span>
            </p>
            <p className="font-mono">
              Product quantity:{" "}
              <span className="text-primary-600">{product?.quantity}</span>{" "}
              units
            </p>
            {product?.manufacturer && (
              <p className="font-mono">
                Product manufacturer:{" "}
                <span className="text-primary-600">
                  {product?.manufacturer}
                </span>
              </p>
            )}
            <p className="font-mono">
              Product store:{" "}
              <span className="text-primary-600">{product?.store}</span>
            </p>
            {product?.productDetails?.brand && (
              <p className="font-mono">
                Product manufacturer:{" "}
                <span className="text-primary-600">
                  {product?.productDetails?.brand}
                </span>
              </p>
            )}
            {product?.productDetails?.modelName && (
              <p className="font-mono">
                Product model:{" "}
                <span className="text-primary-600">
                  {product?.productDetails?.modelName}
                </span>
              </p>
            )}
            {product?.productDetails?.screenSize && (
              <p className="font-mono">
                Product Screen size:{" "}
                <span className="text-primary-600">
                  {product?.productDetails?.screenSize}
                </span>
              </p>
            )}
            {product?.productDetails?.CPUModel && (
              <p className="font-mono">
                Product CPU Model:{" "}
                <span className="text-primary-600">
                  {product?.productDetails?.CPUModel}
                </span>
              </p>
            )}
            {product?.productDetails?.ramMemory && (
              <p className="font-mono">
                RAM Memory:{" "}
                <span className="text-primary-600">
                  {product?.productDetails?.ramMemory}
                </span>
              </p>
            )}
            {product?.productDetails?.romMemory && (
              <p className="font-mono">
                ROM Memory:{" "}
                <span className="text-primary-600">
                  {product?.productDetails?.romMemory}
                </span>
              </p>
            )}
            {product?.productDetails?.operatingSystem && (
              <p className="font-mono">
                Operating System:{" "}
                <span className="text-primary-600">
                  {product?.productDetails?.operatingSystem}
                </span>
              </p>
            )}
            {product?.productDetails?.specialFeature && (
              <p className="font-mono">
                Special Features:{" "}
                <span className="text-primary-600">
                  {product?.productDetails?.specialFeature}
                </span>
              </p>
            )}
            {product?.productDetails?.graphicsCard && (
              <p className="font-mono">
                Graphics Card:{" "}
                <span className="text-primary-600">
                  {product?.productDetails?.graphicsCard}
                </span>
              </p>
            )}
          </div>
          <p className="py-4">
            Created:{" "}
            <span className="text-primary-600">
              {calculateTime(product?.createdAt)}
            </span>
          </p>
          {Admin && (
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="mt-10 flex justify-center items-center rounded-md gap-3 bg-primary-600 block cursor-pointer py-1 px-4 mx-auto w-full sm:w-1/2 hover:bg-primary-500"
            >
              <span>Delete Product</span>
              <FaTrash />
            </button>
          )}
          {openModal && (
            <div className="fixed h-full top-0 left-0 right-0 bottom-0 z-20 bg-gray-400 backdrop-filter backdrop-blur-sm bg-opacity-10 flex flex-col gap-4 items-center py-20 px-4">
              <div className="bg-primary-700 shadow-lg rounded-lg py-4 px-3 w-full sm:w-[500px]">
                <div className="flex items-center justify-between gap-4 flex-col">
                  <div className="flex items-center justify-between w-full gap-2">
                    <h1 className="text-light-1 font-poppins">
                      Delete Product
                    </h1>
                    <FaTimes
                      size={30}
                      className="text-neutral-300 cursor-pointer"
                      onClick={() => setOpenModal(false)}
                    />
                  </div>
                  <form className="w-full">
                    <div className="flex flex-col gap-2 justify-start items-start w-full">
                      <label htmlFor="title">
                        To delete this product, type this{" "}
                        <bold className="text-primary-500 font-bold">
                          {" "}
                          {product?.title.slice(0, 10)}{" "}
                        </bold>
                        to confirm
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="type here..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-[40px] rounded-md border-white border-[2px] outline-none pl-2 text-light-1 font-mono placeholder:text-bold bg-transparent"
                      />
                    </div>
                    <hr className="w-full bg-gray-600 h-[1px] my-3" />
                    <div className="flex w-full justify-end items-center gap-2">
                      <button
                        className="border-[2px] border-neutral-500 rounded-md py-1 px-3 bg-gray-500"
                          type="button"
                          onClick={() => {
                            setTitle('');
                            setOpenModal(false)
                          }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeleteProduct}
                        disabled={
                          title !== product?.title.slice(0, 10)
                        }
                        className={title !== product?.title.slice(0, 10) ? "border-[2px] border-neutral-500 rounded-md py-1 px-3" : "bg-red-800 rounded-md py-1 px-3"}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Toaster />
    </div>
  );
}
