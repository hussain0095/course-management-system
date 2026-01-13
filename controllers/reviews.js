const Course = require("../models/Course");

// POST /courses/:id/reviews  (Add review)
exports.addReview = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    course.reviews.push(req.body);
    await course.save();

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /courses/:courseId/reviews/:reviewId  (Update review)
exports.updateReview = async (req, res) => {
  try {
    const { courseId, reviewId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const review = course.reviews.id(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });

    if (req.body.studentName !== undefined) review.studentName = req.body.studentName;
    if (req.body.rating !== undefined) review.rating = req.body.rating; // must be 1..5 (schema validates)
    if (req.body.comment !== undefined) review.comment = req.body.comment;

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /courses/:courseId/reviews/:reviewId  (Remove review)
exports.deleteReview = async (req, res) => {
  try {
    const { courseId, reviewId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    course.reviews.pull(reviewId);
    await course.save();

    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
