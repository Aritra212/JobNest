import {
  enInternshipsSchema,
  frInternshipsSchema,
  hiInternshipsSchema,
  spInternshipsSchema,
  poInternshipsSchema,
  chInternshipsSchema,
} from "../Models/InternshipsSchema.js";

// post internship
const postInternShip = async (req, res) => {
  const { en, hi, fr, sp, po, ch } = req.body;
  const id = Date.now();

  try {
    if (en) {
      const inernship = await new enInternshipsSchema({
        _id: id,
        title: en.title,
        company: en.company,
        location: en.location,
        duration: en.duration,
        category: en.category,
        description: en.aboutInternship,
        perks: en.perks,
        stipend: en.stipend,
        openings: en.openings,
        startDate: en.startDate,
        aboutCompany: en.aboutCompany,
      }).save();
    }

    if (hi) {
      const inernship = await new hiInternshipsSchema({
        _id: id,
        title: hi.title,
        company: hi.company,
        location: hi.location,
        duration: hi.duration,
        category: hi.category,
        description: hi.aboutInternship,
        perks: hi.perks,
        stipend: hi.stipend,
        openings: hi.openings,
        startDate: hi.startDate,
        aboutCompany: hi.aboutCompany,
      }).save();
    }

    if (fr) {
      const inernship = await new frInternshipsSchema({
        _id: id,
        title: fr.title,
        company: fr.company,
        location: fr.location,
        duration: fr.duration,
        category: fr.category,
        description: fr.aboutInternship,
        perks: fr.perks,
        stipend: fr.stipend,
        openings: fr.openings,
        startDate: fr.startDate,
        aboutCompany: fr.aboutCompany,
      }).save();
    }

    if (sp) {
      const inernship = await new spInternshipsSchema({
        _id: id,
        title: sp.title,
        company: sp.company,
        location: sp.location,
        duration: sp.duration,
        category: sp.category,
        description: sp.aboutInternship,
        perks: sp.perks,
        stipend: sp.stipend,
        openings: sp.openings,
        startDate: sp.startDate,
        aboutCompany: sp.aboutCompany,
      }).save();
    }

    if (po) {
      const inernship = await new poInternshipsSchema({
        _id: id,
        title: po.title,
        company: po.company,
        location: po.location,
        duration: po.duration,
        category: po.category,
        description: po.aboutInternship,
        perks: po.perks,
        stipend: po.stipend,
        openings: po.openings,
        startDate: po.startDate,
        aboutCompany: po.aboutCompany,
      }).save();
    }

    if (ch) {
      const inernship = await new chInternshipsSchema({
        _id: id,
        title: ch.title,
        company: ch.company,
        location: ch.location,
        duration: ch.duration,
        category: ch.category,
        description: ch.aboutInternship,
        perks: ch.perks,
        stipend: ch.stipend,
        openings: ch.openings,
        startDate: ch.startDate,
        aboutCompany: ch.aboutCompany,
      }).save();
    }

    res.status(201).send({
      success: true,
      message: "Internship saved successfully. Internship id = " + id,
      data: en,
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

// get all internships
const getAllInternships = async (req, res) => {
  const { lang } = req.params;
  try {
    let data;
    if (lang === "en") {
      data = await enInternshipsSchema.find();
    } else if (lang === "hi") {
      data = await hiInternshipsSchema.find();
    } else if (lang === "fr") {
      data = await frInternshipsSchema.find();
    } else if (lang === "sp") {
      data = await spInternshipsSchema.find();
    } else if (lang === "po") {
      data = await poInternshipsSchema.find();
    } else if (lang === "ch") {
      data = await chInternshipsSchema.find();
    }

    res.status(200).send({
      success: true,
      message: "Internships fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching Internships",
      error: error,
    });
  }
};

// get internship by category
const getFilteredInternshipByCategory = async (req, res) => {
  const { value, lang } = req.params;
  try {
    let data = [];

    if (lang === "hi") {
      data = await hiInternshipsSchema.find({ category: value });
    } else if (lang === "sp") {
      data = await spInternshipsSchema.find({ category: value });
    } else if (lang === "po") {
      data = await poInternshipsSchema.find({ category: value });
    } else if (lang === "ch") {
      data = await chInternshipsSchema.find({ category: value });
    } else if (lang === "fr") {
      data = await frInternshipsSchema.find({ category: value });
    } else {
      data = await enInternshipsSchema.find({ category: value });
    }

    if (data.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Total Internships Found - " + data.length,
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
      message: "Error in fetching Internship",
      error: error,
    });
  }
};

// get internship by id
const getInternshipById = async (req, res) => {
  const { lang, id } = req.params;
  try {
    let data = {};

    if (lang === "hi") {
      data = await hiInternshipsSchema.findById(id);
    } else if (lang === "sp") {
      data = await spInternshipsSchema.findById(id);
    } else if (lang === "po") {
      data = await poInternshipsSchema.findById(id);
    } else if (lang === "ch") {
      data = await chInternshipsSchema.findById(id);
    } else if (lang === "fr") {
      data = await frInternshipsSchema.findById(id);
    } else {
      data = await enInternshipsSchema.findById(id);
    }

    if (data) {
      return res.status(200).send({
        success: true,
        message: "Successfully found internship data",
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
      message: "Error in fetching internship",
      error: error,
    });
  }
};

export {
  postInternShip,
  getAllInternships,
  getFilteredInternshipByCategory,
  getInternshipById,
};
