import express from 'express';
import mongoose from "mongoose";
import postRoutes from "./routes/post.routes.js";
import publicRoutes from "./routes/public.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import config from "./config/config.js";
import userAccountRoutes from "./routes/userAccount.routes.js";
import authentication from "./middleware/authentication.middleware.js";

const app = express();

app.use(express.json());
app.use(publicRoutes)
app.use(authentication);
app.use('/forum', postRoutes);
app.use('/account', userAccountRoutes);
app.use(errorHandler);

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.db);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.log('MongoDB connection error', err);
    }
}

const startServer = async () => {
    await connectDB();
    app.listen(config.port, () => {
        console.log(`Server started on port ${config.port}. Press Ctrl-C to finish`);
    })
}

startServer();