import User from "../models/user.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
export const signup = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        
        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({message: "Name, email and password are required"});
        }

        // Check if user exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        // Validate password
        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
            // Default values for assistantname and assistantimage are set in the model
        });

        // Save user
        const savedUser = await newUser.save();
        if (!savedUser) {
            throw new Error('Failed to save user');
        }

        // Generate token
        const token = await genToken(savedUser._id);
        if (!token) {
            throw new Error('Failed to generate token');
        }

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7*24*60*60*1000,
            sameSite: "strict",
            secure: process.env.NODE_ENV === 'production'
        });

        // Return success
        const userResponse = savedUser.toObject();
        delete userResponse.password; // Don't send password back
        return res.status(201).json(userResponse);
    } catch(error) {
        console.error('Signup error:', error);
        return res.status(500).json({message: error.message || "Server error during signup"});
    }

}


export const Login =async(req, res) => {
  try{
	const {email, password} = req.body;

	const existingUser = await User.findOne({email});
	if(!existingUser){
		return res.status(400).json({message: "Email does not exist"});
	}
	const isMatch = await bcrypt.compare(password, existingUser.password);
	if(!isMatch){
		return res.status(400).json({message: "Invalid credentials"});
	}

	const token = await genToken(existingUser._id);
	res.cookie("token", token, {
		httpOnly: true,
		maxAge: 7*24*60*60*1000,
		sameSite: "strict",
		secure:false
  })
  return res.status(200).json(existingUser)
}catch(error){
	return res.status(500).json({message: "Login error"})
}
}

export const Logout = async(req, res) => {
  try{
	res.clearCookie("token")
	return res.status(200).json({message: "Logout successful"})
  }catch(error){
	return res.status(500).json({message: "Logout error"})
  }
}