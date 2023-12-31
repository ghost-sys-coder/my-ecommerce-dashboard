import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { errorOptions, successOptions } from "../constants";
import { ProductBox } from "../components";
import { ProductBoxSkeleton } from "../Skeletons";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, status } = await axios.get("/api/products");
        setProducts(data);
        if (status === 200) {
          toast.success("Products fetched!", successOptions);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch products, reload page!", errorOptions);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /** update isFeatured field */
  const handleUpdateIsFeatured = async (productId, checkIsFeatured) => {
    setIsUpdating(true);
    try {
      const { data } = await axios.put(`/api/products/${productId}`, {
        isFeatured: checkIsFeatured,
      });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? {
              ...product,
              isFeatured: data.isFeatured
            }
            : product
        )
      );
      toast.success("Product is now featured!", successOptions);
    } catch (error) {
      console.log(error);
      toast.error("Failed to feature product", errorOptions);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="content">
      <div className="flex justify-between items-center gap-x-10 gap-y-4 mb-4">
        <h1 className="text-2xl font-poppins text-light-1">Products</h1>
        <Link
          className="py-2 px-3 bg-primary-600 rounded-md text-white text-sm hover:bg-primary-500"
          to={"/products/new/create"}
        >
          Add new product!
        </Link>
      </div>
      <div className="w-full grid gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductBoxSkeleton key={index} />
            ))
          : products.map((product, index) => (
              <ProductBox key={index} product={product} onUpdateIsFeatured={handleUpdateIsFeatured} isUpdating={isUpdating} />
            ))}
      </div>
      <Toaster />
    </div>
  );
}
