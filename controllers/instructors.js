const Instructor = require("../models/Instructor");

exports.newInstructorForm = (req, res) => {
  res.render("instructors/new");
};

exports.createInstructor = async (req, res) => {
  try {
    await Instructor.create(req.body);
    res.redirect("/instructors");
  } catch (err) {
    console.log(err);
   
    res.redirect("/instructors/new");
  }
};

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.render("instructors/index", { instructors });
  } catch (err) {
    console.log(err);
    res.send("cannot get instructors");
  }
};

exports.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.params.id);
    res.render("instructors/show", { instructor });
  } catch (err) {
    console.log(err);
    res.send("cannot get instructor");
  }
};
