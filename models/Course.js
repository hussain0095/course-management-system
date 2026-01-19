const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String }
})

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  reviews: [reviewSchema]
})

module.exports = mongoose.model("Course", courseSchema)
