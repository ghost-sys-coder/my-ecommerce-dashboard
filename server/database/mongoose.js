import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        const mongoConnect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB running on: ${mongoConnect.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
};


export default connectDB;