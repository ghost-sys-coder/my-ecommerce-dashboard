import { Router } from "express";
import { checkAdmin } from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, editProduct, fetchProducts, fetchSingleProduct } from "../controllers/products.js";


const router = Router();


/**
 * ! Create product with admin privillege
 */
router.post("/add", checkAdmin, createProduct);

/**
 * ? Fetch All Products
 */
router.get("/", fetchProducts);

/**
 * ! Fetch single product
 */
router.get("/:id", fetchSingleProduct);

/**
 * ? Delete product
 */
router.delete("/:id", checkAdmin, deleteProduct);

/**
 * ! Edit and update products
 */
router.put("/:id", checkAdmin, editProduct);


export default router;