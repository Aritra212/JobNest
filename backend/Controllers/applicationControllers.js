import { applicationSchema } from "../Models/ApplicationSchema.js";
import orderSchema from "../Models/orderSchema.js";

// function to check internship count
const canApply = async (uid) => {
  return orderSchema
    .findOne({ userId: uid })
    .then((data) => {
      // console.log(data);
      if (data?.internshipLimit === "Unlimited") {
        //check month expeirs or not
        const currentDate = new Date(); // Get the current date
        const paymentDate = new Date(data.updatedAt);

        const timeDifference = currentDate.getTime() - paymentDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        if (daysDifference > 30) {
          return { status: false, id: "", count: "" };
        }
      }
      if (data?.internshipLimit > 0 || data?.internshipLimit === "Unlimited") {
        return { status: true, id: data._id, count: data.internshipLimit };
      }
      return { status: false, id: "", count: "" };
    })
    .catch((error) => {
      console.log(error);
      return { status: false, id: "", count: "" };
    });
};

// post application
const saveApplication = async (req, res) => {
  const { jobId, userId, name, phone, email, type } = req.body;

  try {
    const { status, id, count } = await canApply(userId);
    if (!status)
      return res.status(500).send({
        success: false,
        message:
          "Error in Post a new Application. Application limit over or not have any active subscription plan. Subscribe to a new plan",
      });

    const data = await applicationSchema.findOne({ userId, jobId });
    if (data) {
      return res.status(500).send({
        success: false,
        message: "Already applied to this job",
        data,
      });
    }
    const application = await new applicationSchema({
      userId: userId,
      name: name,
      phone: phone,
      email: email,
      jobId: jobId,
      category: type,
    }).save();

    const reduceCount = await orderSchema.updateOne(
      { _id: id },
      {
        $set: {
          internshipLimit: count !== "Unlimited" ? count - 1 : "Unlimited",
        },
      }
    );

    // console.log(application);
    res.status(201).send({
      success: true,
      message:
        "Application saved successfully. Application id = " + application._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Post a new Application",
      error: error,
    });
  }
};

// get sepcific application details by job id and user id
const getApplicationByUserId = async (req, res) => {
  const { jobId, userId } = req.params;

  try {
    const application = await applicationSchema.findOne({
      jobId: jobId,
      userId: userId,
    });

    if (application) {
      return res.status(200).send({
        success: true,
        message: "Aleready applied for the job id = " + jobId,
        data: application,
      });
    }

    res.status(404).send({
      success: false,
      message: "Not applied for the job id = " + jobId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in finding the Application",
      error: error,
    });
  }
};

// get all applications by userID
const getAllApplicationByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const applications = await applicationSchema.find({ userId: userId });

    if (applications.length > 0) {
      return res.status(200).send({
        success: true,
        message: `Total applications found = ${applications.length}`,
        data: applications,
      });
    }

    console.log(userId);
    res.status(404).send({
      success: false,
      message: "No applications found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in finding Applications",
      error: error,
    });
  }
};

// get application by id
const getapplicationDetails = async (req, res) => {
  const { applicationId } = req.params;

  try {
    const application = await applicationSchema.findById(applicationId);

    if (application) {
      return res.status(200).send({
        success: true,
        message: "Application found successfully",
        data: application,
      });
    }
    res.status(404).send({
      success: false,
      message: "Application not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in finding Application",
      error: error,
    });
  }
};

// get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await applicationSchema.find();

    if (applications.length > 0) {
      return res.status(200).send({
        success: true,
        message: `Total applications found = ${applications.length}`,
        data: applications,
      });
    }

    res.status(404).send({
      success: false,
      message: "No applications found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in finding Applications",
      error: error,
    });
  }
};

export {
  saveApplication,
  getAllApplicationByUserId,
  getApplicationByUserId,
  getAllApplications,
  getapplicationDetails,
};
