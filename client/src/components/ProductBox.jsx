/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { calculateTime } from "../lib/functions.js";

const ProductBox = ({product}) => {
  return (
      <Link to={`/products/${product._id}`}>
          <div className="overflow-hidden rounded-md h-[200px]">
              <img className="object-cover w-[100%] h-[100%]" src={product.images[0]} alt="product image" />
          </div>
          <div className="mt-2">
              <h1 className="text-light-1 font-poppins text-sm pb-2 hover:text-primary-500">{product.title}</h1>
              <div className="flex justify-between items-start gap-2">
                  <div className="flex flex-col gap-1 text-light-1 text-sm">
                    <p className="text-gray-400">Price: <span>{product.price}</span></p>  
                    <p className="text-gray-400">Quantity: <span>{product.quantity}</span></p>
                  </div>
                  <p className="text-gray-400">Created: <span>{calculateTime(product.createdAt)}</span></p>
              </div>
          </div>
    </Link>
  )
}

export default ProductBox