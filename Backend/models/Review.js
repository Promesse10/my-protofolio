const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true }, // Make email unique
  job: String,
  comment: String,
  rating: Number,
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
