const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/reviewsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    job: String,
    comment: String,
    rating: Number,
});


const Review = mongoose.model("Review", reviewSchema);


app.post("/submit-review", async (req, res) => {
    const { name, email, job, comment, rating } = req.body;

    try {

        const existingReview = await Review.findOne({ email });

        if (existingReview) {
            return res.status(400).json({ message: "You have already submitted a review." });
        }


        const newReview = new Review({ name, email, job, comment, rating });
        await newReview.save();

        return res.status(201).json({ message: "Review submitted successfully!" });
    } catch (error) {
        return res.status(500).json({ message: "Error submitting review.", error });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
