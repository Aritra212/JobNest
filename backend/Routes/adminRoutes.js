import express from "express";
import { verifyAdmin } from "../Controllers/adminControllers.js";

// router object
const router = express.Router();

// routings

// Verify Admin
router.post("/verify", verifyAdmin);

export default router;
