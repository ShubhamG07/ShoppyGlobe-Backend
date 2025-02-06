import Product from "../Model/product.js";
import {User} from "../Model/user.js";
import Cart from "../Model/cart.js";

// get cart items 
export const getCartItems = async (req, res) => {
    const userId = req.user.id;
    console.log("user id",userId);
    try {
      const cartItems = await Cart.find({ user: userId });
      res.status(200).json({ success: true, message: "All Cart Items", cartItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

// get all users cart items
export const getAllUsersCart = async (req, res) => {
    try {

        const result = await Cart.find();
        res.status(200).json({ success: true, messge: "All Cart Item List", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// get single cart item
export const getSingleCartItem = async (req, res) => {
    let id = req.params.id;

    try {

        const result = await Cart.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }
        res.status(200).json({ success: true, messge: "Cart Item Found", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}


// add cart item
export const addCartItem = async (req, res) => {
    if (!req.body.quantity || 
        !Number.isInteger(req.body.quantity) || 
        req.body.quantity <= 0) {
        return res.status(403).json({ success: false, message: "Quantity must be a positive integer" });
    }

    if (!req.body.user) {
        return res.status(403).json({ success: false, message: "User is required" });
    }
    if (!req.body.product) {
        return res.status(403).json({ success: false, message: "Product is required" });
    }

    const { product, quantity, user } = req.body;

    try {
        const isProductMatch = await Product.findById(product);
        const isUserMatch = await User.findById(user);

        if (!isUserMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!isProductMatch) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const result = await Cart.create({ quantity, product, user });
        res.status(201).json({ success: true, message: "Cart Item added successfully", result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};

// update cart item 
export const updateCartItem = async (req, res) => {
    try {
        console.log("PUT request to update cart item.");

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Cart item ID is required" });
        }

        
        const existingCartItem = await Cart.findById(id);

        if (!existingCartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Update fields
        if (req.body.quantity !== undefined) {
            existingCartItem.quantity = req.body.quantity;
        }

        await existingCartItem.save();
        res.status(200).json({ message: "Cart item updated", cartItem: existingCartItem });

    } catch (error) {
        console.error("Update Cart Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// delete cart item
export const deleteCartItem = async (req, res) => {
    const id = req.params.id;

    if(!id){
        return res.status(400).json({success:false,message:"please provide a valid id to delete item from cart"});
    }

    try {
        const userMatch = await User.findById(req.user.id);
        if (!userMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isItemMatch = await Cart.findById(id);
        if (!isItemMatch) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }

        // Check if the cart item belongs to the user
        if (isItemMatch.user.toString() === userMatch._id.toString()) {
            const result = await Cart.findByIdAndDelete(id);
            res.status(200).json({ success: true, message: "Cart Item deleted successfully", result });
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
