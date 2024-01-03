/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { calculateTime } from "../lib/functions.js";

const ProductBox = ({ product, onUpdateIsFeatured, isUpdating }) => {
  const handleIsFeatured = (e) => {
    e.preventDefault();
    onUpdateIsFeatured(product._id, !product.isFeatured)
  }

  return (
    <Link
      to={`/products/${product._id}`}
      className="relative flex flex-col gap-3"
    >
      <div className="overflow-hidden rounded-md h-[200px]">
        <img
          className="object-cover w-[100%] h-[100%]"
          src={product.images[0]}
          alt="product image"
        />
      </div>
      <div className="mt-2 mb-8">
        <h1 className="text-light-1 font-poppins text-sm pb-2 hover:text-primary-500">
          {product.title.slice(0, 30)}
        </h1>
        <div className="flex justify-between items-start gap-2">
          <div className="flex flex-col gap-1 text-light-1 text-sm">
            <p className="text-gray-400">
              Price: <span>{product.price}</span>
            </p>
            <p className="text-gray-400">
              Quantity: <span>{product.quantity}</span>
            </p>
          </div>
          <p className="text-gray-400">
            Created: <span>{calculateTime(product.createdAt)}</span>
          </p>
        </div>
      </div >
      {isUpdating ? (
        <div className="absolute bg-dark-4 w-full left-0 right-0 rounded-sm text-light-2 flex items-center justify-start gap-2 py-1 px-2">
          <Loader2 />
          <span>Updating...</span>
      </div>
      ): (
        <button
        onClick={handleIsFeatured}
        className="w-full px-3 py-1 rounded-sm text-light-2 bg-dark-4 absolute flex gap-1 justify-start items-center"
        type="button">
            {product.isFeatured ? (
              <>
                <FaThumbsDown className="text-red-500" />
              <span>Remove from Featured!</span>
              </>
            ) : 
              (
                <>
                  <FaThumbsUp className="text-primary-500" />
                  <span>Add to Featured!</span>
                </>
          )}
      </button>
      )}
    </Link>
  );
};

export default ProductBox;
