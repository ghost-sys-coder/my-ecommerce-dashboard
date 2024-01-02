import { Router } from "express";
import { createCategory, fetchCategories } from "../controllers/category.js";
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



export default router;