import express from "express";
import {
  changeLanguage,
  checkBrowserAccess,
  fetchEmail,
  fetchLoginHistory,
  loginHistory,
} from "../Controllers/userAuthControllers.js";

// route obj
const router = express.Router();

// set login history || Method POST
router.post("/history", loginHistory);

// get login history || Method GET
router.get("/history/:userId", fetchLoginHistory);

// get login email || Method GET
router.get("/email/:userId", fetchEmail);

// check Browser access || Method POST
router.post("/check-browser", checkBrowserAccess);

// change language || Method POST
router.post("/change-lang/:lang", changeLanguage);

export default router;
