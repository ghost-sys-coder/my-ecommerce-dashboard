/* eslint-disable react/prop-types */
import { useState } from "react";

const ImageUploader = ({ onImageSelect, btnText }) => {
    const [widget, setWidget] = useState(null);

    const openWidget = () => {
        const cloudinaryWidget = window.cloudinary.createUploadWidget({
            cloudName: import.meta.env.VITE_CLOUDNAME,
            uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOADPRESET,
            folder: import.meta.env.VITE_CLOUDINARY_FOLDER,
            tags: ['products','e-commerce']
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                onImageSelect(result.info.secure_url);
                // console.log(result.info.secure_url)
            }
        });

        setWidget(cloudinaryWidget);
        cloudinaryWidget.open();
    }



  return (
    <div className="mt-4 flex gap-3 items-start flex-col">
      <h1 className="text-light-1 text-xl font-poppins">Add Product Images</h1>
          <button
              onClick={openWidget}
              type="button" className="text-light-1 py-1 px-4 rounded-md cursor-pointer bg-primary-600">
              {btnText}
          </button>
    </div>
  )
}

export default ImageUploader