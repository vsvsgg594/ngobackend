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
        return res.status(200).json({message:"login successfully",user});


    }catch(error){
        console.log("failed to login",error);
        return res.status(400).json({message:"failed to login"})

    }
}
