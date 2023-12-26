import Category from "../models/Category.js";
import SubCategory from "../models/SubCategory.js";
import connectDB from "../database/mongoose.js";

/** 
 * !create a new Category
*/
const createCategory = async (req, res) => {
    await connectDB();
    try {
        const { category, description } = req.body;
        const newCategory = await Category.create({
            category,
            description
        });
        return res.status(200).json({
            success: true,
            message: 'Category has been created!',
            newCategory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

/**
 * ? Fetch Categories
 */
const fetchCategories = async (req, res) => {
    await connectDB();
    try {
        const categories = await Category.find({});
        return res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}


/**
 * ! Add new sub category
 */
const createSubCategory = async (req, res) => {
    await connectDB();
    try {
        const { category, description, parentCategory } = req.body;
        const subCategory = await SubCategory.create({
            category,
            description,
            parentCategory
        });
        return res.status(200).json(subCategory);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

/**
 * ? Fetch Sub Categories
 */
const fetchSubCategories = async (req, res) => {
    await connectDB();
    try {
        const subCategories = await SubCategory.find({}).populate("parentCategory");
        console.log({ subCategories });
        res.status(200).json(subCategories);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}
export {
    createCategory,
    fetchCategories,
    createSubCategory,
    fetchSubCategories
}