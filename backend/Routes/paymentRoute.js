import express from "express";
import {
  activeFreePlan,
  createOrder,
  getSubscriptionDetails,
  verifyOffer,
  verifyOrder,
} from "../Controllers/paymentController.js";

//router object
const router = express.Router();

//routing
//Register || Method POST
router.post("/create-order", createOrder);
router.post("/verify-order", verifyOrder);

// verify coupon || Method POST
router.post("/offer", verifyOffer);

// get Subscription history || Method GET
router.get("/history/:userId", getSubscriptionDetails);

// Register Free plan || Method POST
router.post("/free", activeFreePlan);

export default router;
