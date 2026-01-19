const Course = require("../models/Course")

exports.addReview = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.send("course not found")

    course.reviews.push(req.body)
    await course.save()

    res.redirect("/courses/" + req.params.id)
  } catch (err) {
    res.send("cannot add review")
  }
}

exports.getAllReviews = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.send("course not found")

    res.render("reviews/index.ejs", { course })
  } catch (err) {
    res.send("something went wrong")
  }
}
