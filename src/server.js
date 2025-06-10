import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import config from "./config/config.js";
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());
//app.use(express.urlencoded({extended: true}));
app.use('/forum', postRoutes);
app.use('/account', userRoutes);
app.use(errorHandler)

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb.uri, {
      dbName: config.db.dbName
    });
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