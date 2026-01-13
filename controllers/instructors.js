const Instructor = require("../models/Instructor");

exports.createInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.create(req.body);
    res.status(201).json(instructor);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Instructor email must be unique" });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    if (!instructor) return res.status(404).json({ error: "Instructor not found" });
    res.json(instructor);
  } catch {
    res.status(400).json({ error: "Invalid instructor id" });
  }
};
