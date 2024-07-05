const express = require("express");

const jobController = require("../controller/job.controller");

const router = express.Router();

router.post("/", jobController.createJob);

router.get("/", jobController.listJob);

router.put("/:id", jobController.updateJob);

router.delete("/:id", jobController.deleteJob);

module.exports = router;
