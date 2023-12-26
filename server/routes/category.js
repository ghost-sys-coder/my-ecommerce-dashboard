import { Router } from "express";
import { createCategory, fetchCategories, createSubCategory, fetchSubCategories } from "../controllers/category.js";
import { checkAdmin } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * ! Create a new category
 */
router.post("/add", checkAdmin, createCategory);

/**
 * ? Get all categories
 */
router.get("/", fetchCategories);

/**
 * ! Edit Category
 */


/**
 * ? Delete Category
 */


/**
 * ! Create a new sub category
 */
router.post("/add-subcategory", createSubCategory);

/**
 * ? Fetch Product Sub Categories
 */
router.get("/subcategories", fetchSubCategories);


export default router;