import mongoose from "mongoose"

// adding item to cart schema 
const cartSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      product: {
        ref: "Product",
        type: mongoose.Schema.Types.ObjectId,
        required: true,     
      }
      
});   

 const Cart = mongoose.model("Cart", cartSchema);

export default Cart;