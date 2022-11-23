import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import productsRouter from "./routes/products.js"
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!!");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

// // Router middleware :
app.use(cors());
app.use("/api/products" , productsRouter)
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

// // PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`));