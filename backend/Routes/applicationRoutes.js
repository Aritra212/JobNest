import express from "express";
import {
  getAllApplicationByUserId,
  getAllApplications,
  getApplicationByUserId,
  getapplicationDetails,
  saveApplication,
} from "../Controllers/applicationControllers.js";

// route object
const router = express.Router();

// post application || Method POST
router.post("/apply", saveApplication);

// get all application by user id || Method GET
router.get("/user/:userId", getAllApplicationByUserId);

// get application by job id & user id || Method GET
router.get("/:jobId/:userId", getApplicationByUserId);

// get application by id || Method GET
router.get("/:applicationId", getapplicationDetails);

// get all applications || Method GET
router.get("/", getAllApplications);

export default router;
