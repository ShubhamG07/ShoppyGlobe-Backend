import express from "express";
import { getProducts, getSingleProducts, addProduct, updateProduct, deleteProduct } from "../Controller/product-controller.js";

// validating all fields for posting or updating products 
const validateProduct = (req, res, next) => {
    const { title, price, description,category, stock } = req.body;
  
    if (!title) return res.status(400).json({ success: false, message: "Product Title is required" });
    if (!price) return res.status(400).json({ success: false, message: "Price is required" });
    if (!description) return res.status(400).json({ success: false, message: "Description is required" });
    if (!category) return res.status(400).json({ success: false, message: "Category is required" });
    if (!stock) return res.status(400).json({ success: false, message: "Stock Qty is required" });
  
    next();
  };
  

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/:id",getSingleProducts);
productRouter.post("/", validateProduct, addProduct);
productRouter.put("/:id", validateProduct, updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;