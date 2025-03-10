import multer from 'multer';
import express from 'express';
import Card from "../model/card.js";
import { uploadedFileOnCloudinary } from '../utils/cloudinay.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify the destination for uploaded files


export const createCard = async (req, res) => {
    try {
        const { name, designation, dateOfExpire, dateOfIssues } = req.body; // Get fields from body
        if (!name || !designation || !dateOfExpire || !dateOfIssues) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let imageUrl = ""; // Default to empty string
        if (req.file) {
            // Upload image to Cloudinary if a file is provided
            const uploadResponse = await uploadedFileOnCloudinary(req.file.path);
            imageUrl = uploadResponse.secure_url;
        }

        const newCard = await Card.create({
            name,
            designation,
            dateOfExpire,
            dateOfIssues,
            img: imageUrl // Ensure this stores the image
        });

        return res.status(201).json({ message: "Successfully created card", newCard });

    } catch (err) {
        console.error("Failed to create card", err);
        return res.status(500).json({ message: "Failed to create card" });
    }
};

export const getAllCard=async(req,res)=>{
    try{

        const card=await Card.find();
        if(!card){
            return res.status("Card not found");
        }
        return res.status(200).json({message:"successfully get all card",card});
    }catch(err){
        console.log("falied to fetch card",err);
        return res.status(401).json({message:"failed to fetch cards data"})

    }
}
export const getCardById = async (req, res) => {
    try {
        const { cardId } = req.params;
        const card = await Card.findOne({ _id: cardId });
        console.log(card);

        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }

        return res.status(200).json({ message: "Card retrieved successfully", card });

    } catch (err) {
        console.error("Failed to get card by Id:", err.message);
        return res.status(500).json({ message: "Failed to fetch card", error: err.message });
    }
};

export const deleteCardById = async (req, res) => {
    try {
        const { cardId } = req.params; // Use req.params for DELETE requests

        const deletedCard = await Card.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({ message: "Card not found" });
        }

        return res.status(200).json({ message: "Card deleted successfully", deletedCard });

    } catch (err) {
        console.error("Failed to delete card:", err.message);
        return res.status(500).json({ message: "Failed to delete card", error: err.message });
    }
};
