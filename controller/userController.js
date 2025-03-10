import User from "../model/user.js";
import {uploadedFileOnCloudinary} from '../utils/cloudinay.js'

export const registerUser = async (req, res) => {
    try {
        const { name, designation, email, password, dateofexpire } = req.body;
        const img = req.file ? req.file.filename : null; // Get image filename if uploaded

        if (!name || !designation || !email || !password) {
            return res.status(403).json({ message: "All fields are required" });
        }
        const exitEmail=await User.findOne({email});
        if(exitEmail){
            return res.status(402).json({message:"Email already exits"});
        }
        let imageUrl = "";
        if (req.file) {
            // Upload image to Cloudinary
            imageUrl = await uploadedFileOnCloudinary(req.file.path);
        }

        const newUser = new User({ name, designation, email, password, dateofexpire, img:imageUrl.secure_url });
        await newUser.save();

        return res.status(200).json({ message: "Registration Successful" ,newUser});
    } catch (err) {
        console.error("Failed to create user", err);
        return res.status(400).json({ message: "Failed to create user" });
    }
};

export const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(402).json({message:"Email does not exit"});
        }
        const isMatchPassword=await user.isValidPassword(password);
       
        if(!isMatchPassword){
            return res.status(405).json({message:"password does not match"});

        }
        user.isLogin=true;
        await user.save();
        return res.status(200).json({message:"login successfully",user});


    }catch(error){
        console.log("failed to login",error);
        return res.status(400).json({message:"failed to login"})

    }
}

export const getAllUser=async(req,res)=>{
    try{
        const user=await User.find();
        return res.status(200).json({message:"Register User",user});
    }catch(err){
        console.log("failed to fetch User",err);
        return res.status(401).json({message:"Failed to Fetch User"})

    }
}

export const deleteByIdUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find and delete the user by ID
      const user = await User.findByIdAndDelete(userId);
  
      // If user is not found, return 404
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Return success response
      return res.status(200).json({ message: "User deleted successfully", user });
    } catch (err) {
      console.error("Failed to delete user:", err);
      return res.status(500).json({ message: "Failed to delete user", error: err.message });
    }
  };

  export const findUserByID = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Validate userId format before querying
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
  
      const user = await User.findById(userId); // ✅ Use `findById()`, not `find()`
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ message: "Successfully fetched user", user });
    } catch (err) {
      console.error("Failed to fetch user:", err);
      return res.status(500).json({ message: "Server error, failed to fetch user" });
    }
  };

