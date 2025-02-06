import mongoose from "mongoose";

// creating user schema and Model for our user database 
const productSchema= mongoose.Schema({
    title: {
        type: String, 
        required: true
        },
   
     price: { 
       type: Number, 
       required: true 
    },
   
   description: { 
       type: String,
        required: true 
       },
    
    category: { 
        type: String,
         required: true 
        },

    stock: { 
        type: Number,
         required: true 
        },
}) ;

const Product =mongoose.model("product",productSchema);

export default Product;