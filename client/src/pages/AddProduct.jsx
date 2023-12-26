import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { Image } from "cloudinary-react";
import { errorOptions, successOptions } from "../constants";
import { Color, Description, DropDownList, ExtraDetails, Sizes, ImageUploader } from "../components";

export default function AddProduct() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    images: [],
    price: 0,
    quantity: 0,
    category: '',
    sizes: [],
    colors: '#000',
    productDetails: {},
    manufacturer: "",
    store: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData({ ...productData, [name]: value });
  };

  const handleImageSelect = (imageUrl) => {
    setProductData((prevProductData) => ({
      ...prevProductData,
      images: [...prevProductData.images, imageUrl]
    }))
  }

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    setIsCreatingProduct(true);

    try {
      const { status } = await axios.post("/api/products/add", {
        title: productData.title,
        description: productData.description,
        images: productData.images,
        price: productData.price,
        quantity: productData.quantity,
        category: selected.category, colors: productData.colors, 
        sizes: productData.sizes,
        productDetails: productData.productDetails,
        manufacturer: productData.manufacturer,
        store: productData.store
      });
      
      if (status === 200) {
        toast.success("Product Creation Successful!", successOptions);
        setTimeout(() => {
          navigate("/products")
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create product", errorOptions);
    } finally {
      setIsCreatingProduct(false);
    }
  };

  return (
    <div className="content">
      <h1 className="title">Add new product!</h1>
      <div className="product_form-container">
        <form onSubmit={handleCreateProduct}>
          <div className="input-container">
            <label htmlFor="category">Choose Product Category:</label>
            <DropDownList
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        <div className="input-container">
          <label htmlFor="title">Product Title:</label>
          <input
            type="text" id="title" name="title"
            placeholder="Product title..."
            value={productData.title}
            onChange={handleChange}
          />
          </div>
          <div className="flex gap-2 md:gap-6 flex-wrap">
            <div className="input-container">
              <label htmlFor="price">Product Price:</label>
              <input
                type="number" id="price" name="price"
                placeholder="Product price..."
                value={productData.price}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number" id="quantity" name="quantity"
                placeholder="Product Quantity..."
                value={productData.quantity}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="input-container">
              <label htmlFor="size">Size:</label>
              <input
                type="text" id="size" name="size"
                placeholder="Product sizes..."
                value={productData.sizes}
                onChange={handleChange}
              />
              <Sizes setProductData={setProductData} />
            </div>
            <div className="input-container">
              <label htmlFor="colors">Product Colors:</label>
              <input
                type="text" id="colors" name="colors"
                placeholder="Product colors..."
                value={productData.colors}
                onChange={handleChange}
              />
              <Color
                setProductData={setProductData}
                Color={productData.colors}
              />
            </div>
          </div>

          <div className="flex gap-6 flex-wrap">
            <div className="input-container">
              <label htmlFor="manufacturer">Manufacturer:</label>
              <input
                type="text" id="manufacturer" name="manufacturer"
                placeholder="Product manufacturer..."
                value={productData.manufacturer}
                onChange={handleChange}
              />
            </div>
            <div className="input-container">
              <label htmlFor="store">Store:</label>
              <input
                type="text" id="store" name="store"
                placeholder="Store..."
                value={productData.store}
                onChange={handleChange}
              />
            </div>
          </div>
          <ExtraDetails setProductData={setProductData} />
          <Description setProductData={setProductData} />
          <ImageUploader onImageSelect={handleImageSelect} />
          <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-3 sm:grids-col-2 grid-cols-1 my-5">
            {productData.images?.map((imageUrl, index) => (
              <Image
                  key={index}
                  cloudName="dljizbsqx"
                  publicId={imageUrl}
                  width="100"
                  crop="scale"
                  className='w-[100%] h-[100%] object-cover rounded-md overflow-hidden'
                />

            ))}
          </div>
          <button 
            type="submit"
            className="create-btn"
          >
            {isCreatingProduct ? (
              <div>
                <Loader2 />
                <span>Creating Product</span>
            </div>
            ): (
              <span>Create</span>
            )}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
