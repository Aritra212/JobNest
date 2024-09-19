import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Connected to MongoDB Database - ${con.connection.host}`.blue);
  } catch (err) {
    console.log(`Error!! in MongoDB connection ${err}`.red);
  }
};

export default connectDB;
