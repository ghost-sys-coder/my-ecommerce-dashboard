import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        name: {
            type: String,
            required: true
        },
        mobileNo: {
            type: String,
            required: true
        },
        houseNo: String,
        streetNo: String,
        landMark: String,
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: 'Uganda'
        },
        postalCode: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'Paypal', 'Cash on Delivery', 'Mobile Money'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Status'],
        default: 'Pending'
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Order = model("Order", OrderSchema);

export default Order;
