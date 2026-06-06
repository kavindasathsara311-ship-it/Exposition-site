const express = require("express");

const {
  createInterviewRequest
} = require("../controllers/interviewController");

const router = express.Router();

router.post("/", createInterviewRequest);

module.exports = router;