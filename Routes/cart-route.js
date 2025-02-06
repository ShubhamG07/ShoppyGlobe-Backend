import express from "express";
import { getCartItems, addCartItem, updateCartItem, deleteCartItem } from "../Controller/cart-controller.js";
import jwt from "jsonwebtoken";

const Auth_Check = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Add JWT and token in Header and Second part will be verified
        if (!token) {
            return res.status(403).json({ success: false, message: "Auth token required" });
        }

        const decoded = jwt.verify(token, "securityKey");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

const cartRouter = express.Router();

cartRouter.use(Auth_Check);

cartRouter.get("/", getCartItems);
cartRouter.post("/", addCartItem);
cartRouter.put("/:id", updateCartItem);
cartRouter.delete("/:id", deleteCartItem);

export default cartRouter;
