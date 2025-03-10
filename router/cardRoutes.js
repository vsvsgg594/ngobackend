import {createCard,getAllCard,getCardById,deleteCardById} from '../controller/cardController.js';
import express from 'express';
import { upload } from '../utils/multerConfige.js';

const router=express.Router();

router.post('/createCard', upload.single('img'), createCard);
router.get('/getcard',getAllCard);
router.get('/getcardbyid/:cardId',getCardById);
router.delete('/deletecard/:cardId',deleteCardById);
export default router;