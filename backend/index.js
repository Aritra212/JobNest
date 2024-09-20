import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import adminRoutes from "./Routes/adminRoutes.js";
import internshipRoutes from "./Routes/internshipsRoutes.js";
import applicationRoutes from "./Routes/applicationRoutes.js";
import paymentRoute from "./Routes/paymentRoute.js";
import userAuthRotes from "./Routes/userAuthRoutes.js";
import jobsRoutes from "./Routes/jobRoutes.js";

// config env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

const corsOpts = {
  origin: "https://jobnest-v1.netlify.app",
  // origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOpts));

// routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/internship", internshipRoutes);
app.use("/api/v1/job", jobsRoutes);
app.use("/api/v1/application", applicationRoutes);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/user", userAuthRotes);

// rest api
app.get("/", (req, res) => {
  res.status(200).send({
    status: true,
    message: "Wellcome to JobNest Backend",
  });
});

// port
const PORT = process.env.PORT;

// listen
app.listen(PORT, () => {
  console.log(`server running on port- ${PORT}`.magenta);
});
