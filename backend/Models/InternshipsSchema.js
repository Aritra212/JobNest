import mongoose from "mongoose";

const InternshipsSchema = new mongoose.Schema(
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
    duration: {
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
    stipend: {
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

const enInternshipsSchema = mongoose.model("enInternships", InternshipsSchema);
const hiInternshipsSchema = mongoose.model("hiInternships", InternshipsSchema);
const frInternshipsSchema = mongoose.model("frInternships", InternshipsSchema);
const spInternshipsSchema = mongoose.model("spInternships", InternshipsSchema);
const poInternshipsSchema = mongoose.model("poInternships", InternshipsSchema);
const chInternshipsSchema = mongoose.model("chInternships", InternshipsSchema);

export {
  enInternshipsSchema,
  hiInternshipsSchema,
  frInternshipsSchema,
  spInternshipsSchema,
  poInternshipsSchema,
  chInternshipsSchema,
};
