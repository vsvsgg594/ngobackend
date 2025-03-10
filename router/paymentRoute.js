import express from 'express';
import { paymentInitiate,verifyPayment,getAllPayMentRequest,donationOrder,getAllAcceptedPaymentRequest,updateOrderStatus} from '../controller/paymentController.js';

const router = express.Router();

// Payment Routes
router.post('/initiate', paymentInitiate);
router.post('/verify',verifyPayment);
router.get("/getAllData",getAllPayMentRequest);
router.get("/getAllDonatedData",donationOrder);
router.get("/getAllAcceptData",getAllAcceptedPaymentRequest);
router.put("/updateOrderStatus/:id",updateOrderStatus)




export default router;
