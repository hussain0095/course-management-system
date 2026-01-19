const Course = require("../models/Course")

exports.addReview = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.send("Course not found")

    course.reviews.push(req.body)
    await course.save()

    res.redirect(`/courses/${req.params.id}`)
  } catch (err) {
    console.log(err)
    res.redirect(`/courses/${req.params.id}`)
  }
}

exports.getCourseReviews = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.send("Course not found")

    res.render("reviews/index", { course })
  } catch (err) {
    console.log(err)
    res.send("cannot get reviews")
  }
}
exports.getReviewsPage = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor");
    if (!course) return res.send("course not found");

    res.render("reviews/index.ejs", { course });
  } catch (err) {
    res.send("cannot get reviews");
  }
};
