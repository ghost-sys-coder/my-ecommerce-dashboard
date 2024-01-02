import Category from "../models/Category.js";
import connectDB from "../database/mongoose.js";

/** 
 * !create a new Category
*/
const createCategory = async (req, res) => {
    await connectDB();
    try {
        const { category, description, parentCategory, imgUrl } = req.body;
        const newCategory = await Category.create({
            category,
            description,
            imgUrl,
            parentCategory
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


export {
    createCategory,
    fetchCategories,
}