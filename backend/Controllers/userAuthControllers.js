import LoginHistorySchema from "../Models/LoginHistorySchema.js";
import { publicIpv4 } from "public-ip";
import { sendOTP } from "../utils/sendMails.js";

// save login history
const loginHistory = async (req, res) => {
  const { browser, os, isMobile, userId, email } = req.body;
  const ip = await publicIpv4();

  try {
    const data = await new LoginHistorySchema({
      userId,
      email,
      browser,
      os,
      ipAddress: ip,
      deviceType: isMobile ? "Mobile" : "Desktop/Laptop",
    }).save();

    res.status(201).send({
      success: true,
      message: "Login histroy saved",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in saving login history",
      error: error,
    });
  }
};

// get login histories by userId
const fetchLoginHistory = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await LoginHistorySchema.find({ userId });

    if (data.length == 0) {
      return res.status(404).send({
        success: false,
        message: "Login histroy not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Login histroy fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching login history",
      error: error,
    });
  }
};

// get mail by user id
const fetchEmail = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await LoginHistorySchema.findOne({ userId });
    if (data.length == 0) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "email fetched successfully",
      email: data.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching user email",
      error: error,
    });
  }
};

// check browser access
const checkBrowserAccess = async (req, res) => {
  const { browser, userName, email } = req.body;
  // console.log(browser);
  if (browser === "chrome") {
    const data = await sendOTP(
      email,
      "JOBNEST OTP",
      `Hi ${userName} to access the website from chrome browser used the OTP.`
    );
    // console.log(data);
    if (data.success) {
      return res.status(200).send(data);
    } else {
      return res.status(500).send(data);
    }
  }
  res.status(200).send({
    success: true,
    message: "Access granted",
  });
};

// change language
const changeLanguage = async (req, res) => {
  const { userName, email } = req.body;
  const { lang } = req.params;

  const data = await sendOTP(
    email,
    "JOBNEST OTP",
    `Hi ${userName} to change the website language used the OTP.`
  );
  if (data.success) {
    return res.status(200).send(data);
  } else {
    return res.status(500).send(data);
  }
};

export {
  loginHistory,
  checkBrowserAccess,
  changeLanguage,
  fetchLoginHistory,
  fetchEmail,
};
