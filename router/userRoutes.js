import express from "express";
import { registerUser,loginUser,getAllUser, deleteByIdUser } from "../controller/userController.js";
import { upload } from "../utils/multerConfige.js";

const router = express.Router();

router.post("/register", upload.single("img"), registerUser);
router.post("/login",loginUser);
router.get("/getUser",getAllUser);
router.delete('/delete/:userId',deleteByIdUser)

export default router;
