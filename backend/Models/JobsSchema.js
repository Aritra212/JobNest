import mongoose from "mongoose";

const JobsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: Array,
      required: true,
    },
    experience: {
      type: String,
      default: "Not Disclosed",
    },
    category: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    perks: {
      type: Array,
      required: true,
    },
    ctc: {
      type: String,
      default: "Not Disclosed",
    },
    openings: {
      type: Number,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    aboutCompany: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const enJobsSchema = mongoose.model("enJobs", JobsSchema);
const hiJobsSchema = mongoose.model("hiJobs", JobsSchema);
const frJobsSchema = mongoose.model("frJobs", JobsSchema);
const spJobsSchema = mongoose.model("spJobs", JobsSchema);
const poJobsSchema = mongoose.model("poJobs", JobsSchema);
const chJobsSchema = mongoose.model("chJobs", JobsSchema);

export {
  enJobsSchema,
  hiJobsSchema,
  frJobsSchema,
  spJobsSchema,
  poJobsSchema,
  chJobsSchema,
};
