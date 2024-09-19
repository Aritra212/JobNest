import mongoose from "mongoose";

const LoginHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  os: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    required: true,
  },
  loginTime: { type: Date, default: new Date() },
});

export default mongoose.model("history", LoginHistorySchema);
