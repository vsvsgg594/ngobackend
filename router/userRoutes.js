import express from "express";
import { registerUser,loginUser } from "../controller/userController.js";
import { upload } from "../utils/multerConfige.js";

const router = express.Router();

router.post("/register", upload.single("img"), registerUser);
router.post("/login",loginUser);

export default router;
