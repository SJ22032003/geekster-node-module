const JobModel = require("../model/job");

const createJob = async (req, res, next) => {
  try {

    // console.log(req.body);
    await JobModel.wwe(req.body);
    // console.log(newlyInsertedJob._id);
    res.json({
      success: true,
      message: "Job created successfully",
    });
  } catch (err) {
    next(err);
  }
};

const listJob = async (req, res) => {

  const minSalary = req.query.minSalary || 0;

  const conditions = {};

  if(req.query.minSalary) {
    conditions.salary = {
      $gt: minSalary,
    };
  }

  if(req.query.title) {
    conditions.title = {
      $regex: new RegExp(`${req.query.title}`, "gi"),
    };
  }
  
  const jobsList = await JobModel.find(conditions);
  res.json({
    success: true,
    message: "Jobs list",
    results: jobsList,
  });
};

const updateJob = (req, res) => {
  res.json({
    success: true,
    message: "Update job API",
  });
};

const deleteJob = (req, res) => {
  res.json({
    success: true,
    message: "Delete job API",
  });
};

const jobController = {
  createJob,
  listJob,
  updateJob,
  deleteJob,
};

module.exports = jobController;
