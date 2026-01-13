const Course = require("../models/Course");
const Instructor = require("../models/Instructor");

// BONUS: Cannot create course with non-existent instructor
exports.createCourse = async (req, res) => {
  try {
    const { instructor } = req.body;

    const exists = await Instructor.findById(instructor);
    if (!exists) {
      return res.status(400).json({ error: "Cannot create a course with a non-existent instructor" });
    }

    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor");
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch {
    res.status(400).json({ error: "Invalid course id" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    // BONUS: if instructor updated, validate existence
    if (req.body.instructor) {
      const exists = await Instructor.findById(req.body.instructor);
      if (!exists) {
        return res.status(400).json({ error: "Cannot update: instructor not found" });
      }
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("instructor");

    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted" });
  } catch {
    res.status(400).json({ error: "Invalid course id" });
  }
};
