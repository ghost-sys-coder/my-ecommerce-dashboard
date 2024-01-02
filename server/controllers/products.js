import Product from "../models/Product.js";

/**
 * ! Create products
 */
const createProduct = async (req, res) => {
  const {
    title,
    description,
    images,
    price,
    quantity,
    category,
    colors,
    sizes,
    productDetails,
    manufacturer,
    store,
    minPrice,
    maxPrice,
  } = req.body;
  try {
    const product = await Product.create({
      title,
      description,
      images,
      price,
      quantity,
      category,
      colors,
      sizes,
      productDetails,
      manufacturer,
      store,
      minPrice,
      maxPrice,
    });
    console.log({ product });
    return res.status(200).json({
      success: true,
      message: "Product created!",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * ? Fetch All products
 */
const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log(products)
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * ! Fetch single product
 */
const fetchSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate("category");
    console.log(product)
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * ? Delete product
 */
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {

    /** delete product from mongoDB */
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product has been deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * ! Edit and update product
 */
const editProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Product updated!",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};


export {
  createProduct,
  fetchProducts,
  fetchSingleProduct,
  deleteProduct,
  editProduct
};
