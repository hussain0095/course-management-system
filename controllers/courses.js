const Course = require("../models/Course")
const Instructor = require("../models/Instructor")



exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");
    const instructors = await Instructor.find();
    res.render("courses/index.ejs", { courses, instructors });
  } catch (err) {
    res.send("cannot get courses");
  }
};


exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor");
    const instructors = await Instructor.find();

    if (!course) return res.send("course not found");

    res.render("courses/show.ejs", { course, instructors });
  } catch (err) {
    res.send("invalid course id");
  }
};


exports.createCourse = async (req, res) => {
  try {
    const exists = await Instructor.findById(req.body.instructor);
    if (!exists) return res.send("instructor not found");

    await Course.create(req.body);
    res.redirect("/courses");
  } catch (err) {
    res.send("cannot create course");
  }
};

exports.updateCourse = async (req, res) => {
  try {
    if (req.body.instructor) {
      const exists = await Instructor.findById(req.body.instructor);
      if (!exists) return res.send("instructor not found");
    }

    await Course.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect(`/courses/${req.params.id}`);
  } catch (err) {
    res.send("cannot update course");
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect("/courses");
  } catch (err) {
    res.send("cannot delete course");
  }
};
