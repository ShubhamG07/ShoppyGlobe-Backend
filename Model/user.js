import mongoose from "mongoose"

//register user schema
const userSignupSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});



export const User = mongoose.model("User", userSignupSchema);

//login user schema

// const userLoginSchema = new mongoose.Schema( {
    
//     email : {
//         type:String,
//         required: true,
//     },
//     password :{
//         type:String,
//         required: true,
//     }
    
// })
// export const loginUser = mongoose.model("loginUser", userLoginSchema);