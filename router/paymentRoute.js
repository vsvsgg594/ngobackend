import express from 'express';
import {initiatePayment,verifyPayment} from '../controller/paymentController.js'

const router=express();

router.post('/initiate',initiatePayment);

router.post('/verify',verifyPayment);

export default router;
