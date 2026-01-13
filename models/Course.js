const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);


const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number },

   
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Instructor",
      required: true,
    },

  
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
