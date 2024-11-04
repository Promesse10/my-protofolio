const express = require("express");
const { submitReview } = require("../controllers/reviewController");

const router = express.Router();

// POST /api/reviews
router.post("/", submitReview);

module.exports = router;
