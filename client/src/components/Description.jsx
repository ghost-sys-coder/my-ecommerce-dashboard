/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";


import { modules, formats } from "../constants";

const Description = ({setProductData}) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setProductData((values) => ({
            ...values,
            description: value
        }))
    }, [setProductData, value])

  return (
      <div className="flex flex-col gap-3">
          <h1 className="text-light-1 font-poppins text-xl">Add Product Description:</h1>
          <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              modules={modules}
              formats={formats}
              placeholder="Provide product description..."
              className="text-dark-3 font-poppins focus-within:min-h-[150px] focus-within:bg-gray-300 bg-light-1"
          />
    </div>
  )
}

export default Description