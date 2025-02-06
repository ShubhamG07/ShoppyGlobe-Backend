import mongoose from "mongoose";
import express from "express";
import cartRouter from "./Routes/cart-route.js";
import productRouter from "./Routes/product-route.js";
import userRouter from "./Routes/user-route.js";
import { productData } from "./utils/mockdata.js";
import Product from "./Model/product.js";

// mongoDB connection configuration 
mongoose.connect("mongodb://localhost:27017/");

const db=mongoose.connection;

db.on("open",()=>{
    console.log("connection successful");
});

db.on("error",()=>{
    console.log("connection unsuccessful");
});

 Product.insertMany(productData)
    .then(data => console.log("Product inserted in database"))
    .catch(error => console.log("Error inserting users:", error));

// creating server with express
const app = new express();

// giving port number to our server
app.listen(5100, () => {
  console.log("server is running on port 5100");
});

// using json parsor of express
app.use(express.json());


// some common middleware for all request
app.use(
    (req, res, next) => {
      console.log(req.method);
      next();
    },
    (req, res, next) => {
      res.on("finish", () => {
        console.log(`URL :${req.url} , Status Code: ${res.statusCode}`);
      });
  
      next();
    }
  );
  
   // Error-handling middleware
   app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

  // Routes
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);
