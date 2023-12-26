import { Schema, model } from 'mongoose';

const ProductSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Product title required!'],
    },
    description: {
        type: String,
        required: [true, 'Product description required!']
    },
    images: {
        type: [String],
        required: [true, 'Product images required!']
    },
    price: {
        type: Number,
        required: [true, 'Price field missing!'],
        default: 0
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity required'],
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Product Category required!']
    },
    sizes: {
        type: [String],
    },
    colors: {
        type: String
    },
    productDetails: {
        type: Object
    },
    manufacturer: {
        type: String
    },
    store: {
        type: String
    }
}, { timestamps: true });


const Product = model('Product', ProductSchema);

export default Product;