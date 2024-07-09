const JobModel = require("../model/job");

const createJob = async (req, res, next) => {
  try {
    // console.log(req.body);
    const newlyInsertedJob = await JobModel.create(req.body);
    // console.log(newlyInsertedJob._id);
    res.json({
      success: true,
      message: "Job created successfully",
    });
  } catch (err) {
    next(err);
  }
};

const checkMinSalary = (salary) => {
  if(!salary) return new Error("Salary is required");
  return salary;
}

const listJob = async (req, res, next) => {
  try {

    const minSalary = checkMinSalary(req.query.minSalary);
    if(minSalary instanceof Error) {
      req.statusCode = 400;
      throw minSalary;
    }

    const conditions = {};

    if (req.query.minSalary) {
      conditions.salary = {
        $gt: minSalary,
      };
    }

    if (req.query.title) {
      conditions.title = {
        $regex: new RegExp(`${req.query.title}`, "gi"),
      };
    }

    const jobsList = await JobModel.slekrbnekl(conditions);
    return res.json({
      success: true,
      message: "Jobs list",
      results: jobsList,
    });
  } catch (error) {
    next(error);
  }
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
