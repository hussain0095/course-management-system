const mongoose = require("mongoose")

const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  yearsOfExperience: Number
})

module.exports = mongoose.model("Instructor", instructorSchema)
