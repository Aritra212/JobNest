// import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import orderSchema from "../Models/orderSchema.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// config env
dotenv.config();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

// Create order
export const createOrder = async (req, res) => {
  const { plan, discountedamt } = req.body;

  const plans = {
    free: { amount: 0, name: "Free Plan", internshipLimit: 1 },
    bronze: { amount: 10000, name: "Bronze Plan", internshipLimit: 3 },
    silver: { amount: 30000, name: "Silver Plan", internshipLimit: 5 },
    gold: { amount: 100000, name: "Gold Plan", internshipLimit: "Unlimited" },
  };

  let selectedPlan = plans[plan];
  if (!selectedPlan) return res.status(400).send("Invalid Plan");

  // const discountedAmount = selectedPlan.amount * ((100 - offer) / 100);

  const currentHour = new Date().getHours();
  if (currentHour < 10 || currentHour > 23) {
    return res
      .status(400)
      .send("Payments can only be made between 10 am-11 pm IST");
  }

  const options = {
    amount: discountedamt < 0 ? selectedPlan.amount : discountedamt * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      orderId: order.id,
      plan: selectedPlan.name,
      amount: selectedPlan.amount,
      internshipLimit: selectedPlan.internshipLimit,
    });
  } catch (err) {
    res.status(500).send("Error creating order");
  }
};

//Verifying the payment
export const verifyOrder = async (req, res) => {
  try {
    const {
      userId,
      email,
      plan,
      amount,
      internshipLimit,
      razorpay_orderID,
      razorpay_paymentID,
      razorpay_signature,
    } = req.body;
    const sign = razorpay_orderID + "|" + razorpay_paymentID;
    const resultSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    // console.log(req.body, resultSign);

    if (razorpay_signature === resultSign) {
      const prevData = await orderSchema.findOne({ userId });

      if (prevData) {
        const updatedData = await orderSchema.updateOne(
          { _id: prevData._id },
          {
            $set: {
              orderId: razorpay_orderID,
              amount: prevData.amount + amount / 100,
              plan: prevData.plan + "+" + plan,
              userId,
              userEmail: email,
              paymentId: razorpay_paymentID,
              internshipLimit: prevData.internshipLimit + internshipLimit,
            },
          }
        );
      } else {
        const newOrder = new orderSchema({
          orderId: razorpay_orderID,
          amount: amount / 100,
          plan,
          userId,
          userEmail: email,
          paymentId: razorpay_paymentID,
          internshipLimit,
        });

        await newOrder.save();
      }

      // Send confirmation email
      const transporter = nodemailer.createTransport({
        secure: true,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Subscription Confirmation",
        text: `Thank you for subscribing to the ${plan}. Your transaction ID is ${razorpay_paymentID}.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email", error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res.status(200).json({
        message: "Payment verified successfully and email sent to your mail id",
        status: "OK",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

// Active free plan
export const activeFreePlan = async (req, res) => {
  const { email, userId } = req.body;

  try {
    // check previous data
    const data = await orderSchema.findOne({ userId: userId, plan: "free" });

    if (data)
      return res.status(500).send({
        success: false,
        message:
          "Allready subscribed a free plan. Can't active another plan choose other plans.",
        data: data,
      });

    const id = Date.now();
    const newOrder = await new orderSchema({
      orderId: id,
      amount: 0,
      plan: "free",
      userId,
      userEmail: email,
      paymentId: "no",
      internshipLimit: 1,
    }).save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      secure: true,
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Subscription Confirmation",
      text: `Thank you for subscribing to the ${plan} paln.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).send({
      success: true,
      message:
        "Free plan activated successfully. A confirmation mail send to your mail id.",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Free plan saving error",
      error: error,
    });
  }
};

// verify cupon and set discount
const verifyOffer = async (req, res) => {
  const coupons = ["ap10", "pc5"];
  const { coupon, amt, offer } = req.body;

  if (amt <= 0) {
    return res.status(500).send({
      status: false,
      message: "Amount not valid of discount",
      data: amt,
    });
  }

  if (!coupons.find((el) => el === coupon)) {
    return res.status(500).send({
      status: false,
      message: "Cupon not valid for discount",
      data: coupon,
    });
  }

  const discountedamt = amt - (amt * offer) / 100;

  res.status(200).send({
    status: true,
    message: `Congratulations you got ${offer}% discount`,
    data: {
      amt,
      discountedamt,
    },
  });
};

// get subscription details by userId
const getSubscriptionDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const data = await orderSchema.findOne({ userId });

    if (data.length == 0) {
      res.status(404).send({
        success: false,
        message: "Subscription histroy not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Subscription histroy fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching Subscription history",
      error: error,
    });
  }
};

export { verifyOffer, getSubscriptionDetails };
