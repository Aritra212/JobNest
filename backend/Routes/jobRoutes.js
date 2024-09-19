import express from "express";
import {
  postJobs,
  getAllJobs,
  getFilteredJobsByCategory,
  getJobById,
} from "../Controllers/jobsControllers.js";

// router object
const router = express.Router();

// Post Job || Method POST
router.post("/post", postJobs);

// Get Jobs by Category || Method GET
router.get("/category/:value/:lang", getFilteredJobsByCategory);

// Get job by id || Method GET
router.get("/:lang/:id", getJobById);

// Get all Jobs || Method GET
router.get("/:lang", getAllJobs);

export default router;
