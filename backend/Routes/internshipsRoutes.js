import express from "express";
import {
  getAllInternships,
  getFilteredInternshipByCategory,
  getInternshipById,
  postInternShip,
} from "../Controllers/internshipControllers.js";

// router object
const router = express.Router();

// Post internship || Method POST
router.post("/post", postInternShip);

// Get Internships by Category || Method GET
router.get("/category/:value/:lang", getFilteredInternshipByCategory);

// Get internship by id || Method GET
router.get("/:lang/:id", getInternshipById);

// Get all internships || Method GET
router.get("/:lang", getAllInternships);

export default router;
