import { useEffect, useRef, useState } from "react";

const CloudinaryWidget = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  console.log({imageUrls})

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDNAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOADPRESET,
      },
      function (error, result) {
        if (error) {
          console.log(error);
        }
        // console.log(result.info.secure_url);
        setImageUrls((values)=> [...values, result.info.secure_url])
      }
    );
  }, []);

  return (
    <div className="mt-4 flex gap-3 items-start flex-col">
      <h1 className="text-light-1 text-xl font-poppins">Add Product Images</h1>
      <button type="button" className="text-light-1 py-1 px-4 rounded-md cursor-pointer bg-primary-600" onClick={() => widgetRef.current.open()}>Upload Product Images</button>
      <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grids-col-2 grid-cols-1">
        {imageUrls.map((imageUrl, index) => {
          if (!imageUrl) return;
          return (
            <div key={index} className="w-[100%] h-[100%] rounded-md overflow-hidden">
            <img src={imageUrl} alt="image" />
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default CloudinaryWidget;
