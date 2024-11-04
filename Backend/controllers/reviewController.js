const Review = require("../models/Review");

const submitReview = async (req, res) => {
  const { name, email, job, comment, rating } = req.body;

  try {
    // Check if a review already exists for this email
    const existingReview = await Review.findOne({ email });

    if (existingReview) {
      return res.status(400).json({ message: "You have already submitted a review." });
    }

    // Create a new review
    const newReview = new Review({ name, email, job, comment, rating });
    await newReview.save();

    return res.status(201).json({ message: "Review submitted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error submitting review.", error });
  }
};

module.exports = { submitReview };
