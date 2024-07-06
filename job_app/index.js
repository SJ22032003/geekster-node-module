const express = require("express");
const mongoose = require("mongoose");

const jobRoutes = require("./route/job");

const app = express();

mongoose
  .connect("mongodb://localhost:6700/job_app")
  .then(() => console.log("DB Connected successfully"))
  .catch((err) => console.log("Error connecting database", err));

// Middlewares
app.use(express.json());

function authorized(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }
  next();
}

function logger(req, res, next) {
  console.log("Request METHOD", req.method);
  console.log("Request received at", new Date());
  next();
}

app.use(logger);

// Routes
app.use("/api/jobs", authorized, jobRoutes);


function errorMiddleware(err, req, res, next) {
  console.log(err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

app.use(errorMiddleware);


app.listen(10000, () => console.log(`Server is up and running at port 10000`));