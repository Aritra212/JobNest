import {
  enJobsSchema,
  hiJobsSchema,
  frJobsSchema,
  spJobsSchema,
  poJobsSchema,
  chJobsSchema,
} from "../Models/JobsSchema.js";

// post a job
const postJobs = async (req, res) => {
  const { en, hi, fr, sp, po, ch } = req.body;
  const id = Date.now();

  try {
    let job = {};
    if (en) {
      job = await new enJobsSchema({
        _id: id,
        title: en.title,
        company: en.company,
        location: en.location,
        experience: en.experience,
        category: en.category,
        description: en.aboutInternship,
        perks: en.perks,
        ctc: en.ctc,
        openings: en.openings,
        startDate: en.startDate,
        aboutCompany: en.aboutCompany,
      }).save();
    }

    if (hi) {
      job = await new hiJobsSchema({
        _id: id,
        title: hi.title,
        company: hi.company,
        location: hi.location,
        experience: hi.experience,
        category: hi.category,
        description: hi.aboutInternship,
        perks: hi.perks,
        ctc: hi.ctc,
        openings: hi.openings,
        startDate: hi.startDate,
        aboutCompany: hi.aboutCompany,
      }).save();
    }

    if (fr) {
      job = await new frJobsSchema({
        _id: id,
        title: fr.title,
        company: fr.company,
        location: fr.location,
        experience: fr.experience,
        category: fr.category,
        description: fr.aboutInternship,
        perks: fr.perks,
        ctc: fr.ctc,
        openings: fr.openings,
        startDate: fr.startDate,
        aboutCompany: fr.aboutCompany,
      }).save();
    }

    if (sp) {
      job = await new spJobsSchema({
        _id: id,
        title: sp.title,
        company: sp.company,
        location: sp.location,
        experience: sp.experience,
        category: sp.category,
        description: sp.aboutInternship,
        perks: sp.perks,
        ctc: sp.ctc,
        openings: sp.openings,
        startDate: sp.startDate,
        aboutCompany: sp.aboutCompany,
      }).save();
    }

    if (po) {
      job = await new poJobsSchema({
        _id: id,
        title: po.title,
        company: po.company,
        location: po.location,
        experience: po.experience,
        category: po.category,
        description: po.aboutInternship,
        perks: po.perks,
        ctc: po.ctc,
        openings: po.openings,
        startDate: po.startDate,
        aboutCompany: po.aboutCompany,
      }).save();
    }

    if (ch) {
      job = await new chJobsSchema({
        _id: id,
        title: ch.title,
        company: ch.company,
        location: ch.location,
        experience: ch.experience,
        category: ch.category,
        description: ch.aboutInternship,
        perks: ch.perks,
        ctc: ch.ctc,
        openings: ch.openings,
        startDate: ch.startDate,
        aboutCompany: ch.aboutCompany,
      }).save();
    }

    res.status(201).send({
      success: true,
      message: "Job saved successfully. Job id = " + id,
      data: job,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Post a new Internship",
      error: err,
    });
  }
};

// get all jobs
const getAllJobs = async (req, res) => {
  const { lang } = req.params;
  try {
    let data;
    if (lang === "en") {
      data = await enJobsSchema.find();
    } else if (lang === "hi") {
      data = await hiJobsSchema.find();
    } else if (lang === "fr") {
      data = await frJobsSchema.find();
    } else if (lang === "sp") {
      data = await spJobsSchema.find();
    } else if (lang === "po") {
      data = await poJobsSchema.find();
    } else if (lang === "ch") {
      data = await chJobsSchema.find();
    }

    res.status(200).send({
      success: true,
      message: "Jobs fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching Jobs",
      error: error,
    });
  }
};

// get jobs by category
const getFilteredJobsByCategory = async (req, res) => {
  const { value, lang } = req.params;
  try {
    let data = [];

    if (lang === "hi") {
      data = await hiJobsSchema.find({ category: value });
    } else if (lang === "sp") {
      data = await spJobsSchema.find({ category: value });
    } else if (lang === "po") {
      data = await poJobsSchema.find({ category: value });
    } else if (lang === "ch") {
      data = await chJobsSchema.find({ category: value });
    } else if (lang === "fr") {
      data = await frJobsSchema.find({ category: value });
    } else {
      data = await enJobsSchema.find({ category: value });
    }

    if (data.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Total Jobs Found - " + data.length,
        data: data,
      });
    }

    res.status(404).send({
      success: false,
      message: "No data found",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching Jobs",
      error: error,
    });
  }
};

// get job by id
const getJobById = async (req, res) => {
  const { lang, id } = req.params;
  try {
    let data = {};

    if (lang === "hi") {
      data = await hiJobsSchema.findById(id);
    } else if (lang === "sp") {
      data = await spJobsSchema.findById(id);
    } else if (lang === "po") {
      data = await poJobsSchema.findById(id);
    } else if (lang === "ch") {
      data = await chJobsSchema.findById(id);
    } else if (lang === "fr") {
      data = await frJobsSchema.findById(id);
    } else {
      data = await enJobsSchema.findById(id);
    }

    if (data) {
      return res.status(200).send({
        success: true,
        message: "Successfully found job data",
        data: data,
      });
    }

    res.status(404).send({
      success: false,
      message: "No data found",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching Job",
      error: error,
    });
  }
};

export { postJobs, getAllJobs, getFilteredJobsByCategory, getJobById };
