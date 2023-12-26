import { Schema, model } from "mongoose";

const SubCategorySchema = new Schema({
    category: {
        type: String,
        required: [true, 'Sub category required'],
        unique: [true, 'Sub Category already exists']
    },
    description: {
        type: String,
        required: [true, 'category description required!']
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Parent Category required!']
    }
});


const SubCategory = model('SubCategory', SubCategorySchema);

export default SubCategory;