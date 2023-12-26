import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './database/mongoose.js';


/** import routes */
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import productRoutes from "./routes/products.js";
import customerRoutes from "./routes/customers.js"
import categoryRoutes from "./routes/category.js";

/** import auth middleware */
import { checkUser, checkAdmin, requireAuthToken } from "./middleware/authMiddleware.js";

/** env file configuration */
dotenv.config({ path: './config/config.env' });

/** initialize express application */
const app = express();
const port = process.env.PORT || 8000;

/** logging files and actions */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

/** system configuration */
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE']
}));


/** routes */
app.use("/api/auth/", authRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/products/", productRoutes);
app.use('/api/customers/', customerRoutes);
app.use('/api/categories/', categoryRoutes);

/** run express application */
app.listen(port, async () => {
    await connectDB();
    console.log(`Server running on port: ${port}`)
})