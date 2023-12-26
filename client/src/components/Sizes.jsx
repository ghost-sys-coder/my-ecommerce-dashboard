/* eslint-disable react/prop-types */
import { useState } from "react";

function Sizes({setProductData}) {
    const sizes = [
        'Small', 'Medium', 'Large', 'Extra',
        '38', '39', '40', '41', '42', '43', '44', '45'
    ];
    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleSize = (size) => {
        setSelectedSizes((values) => {
            if (values.includes(size)) {
                return values.filter((s) => s !== size)
            } else {
                return [...values, size]
            }
        })
    }

    const handleAddSize = (e) => {
        e.preventDefault();
        setProductData(values => ({
            ...values,
            sizes: selectedSizes.join(",")
        }))
    }

  return (
      <div className="flex flex-wrap gap-1 mt-2">
          {sizes.map((size, index) => (
              <button
                  onClick={() => handleSize(size)}
                  className={`p-1 flex-1 rounded-sm shadow-md text-light-1 font-mono hover:bg-primary-500 ${selectedSizes.includes(size) ? "bg-dark-1" : "bg-primary-600"}`}
                  key={index} type="button">
                  {size}
              </button>
          ))}
          <button
              type="button"
              onClick={handleAddSize}
              className="py-2 px-4 bg-dark-4 text-light-1 rounded-md cursor-pointer mt-4 block w-full">
              Add Size(s)
          </button>
    </div>
  )
}

export default Sizes