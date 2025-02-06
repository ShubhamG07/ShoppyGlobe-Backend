import bcrypt from "bcrypt";
import { User } from "../Model/user.js";
import JWT from "jsonwebtoken";


const jwtKey = "securityKey"; // Use  for security


// Register User
export const User_register = async (req, res) => {
  const { name, email, password, address } = req.body;

  // Validate input fields
  if (!name || !email || !password || !address) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email is already registered" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address
    });

    // Generate JWT token
    const token = JWT.sign({ id: user._id }, jwtKey, { expiresIn: "2h" });

    res.status(201).json({ success: true, user, token });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Login User
export const User_login = async (req, res) => {
  const { email, password } = req.body;

  //Validate input fields
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ success: false, message: "No user found with this Email id" });
    }

    //Comparing passwords for security
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ success: false, message: "Password is incorrect" });
    }

    //Generate JWT token
    const token = JWT.sign({ id: user._id }, jwtKey, { expiresIn: "1d" });

    res.status(200).json({ success: true, user, token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
