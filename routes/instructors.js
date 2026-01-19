const express = require("express")
const router = express.Router()
const instructorController = require("../controllers/instructors")

router.post("/", instructorController.createInstructor)

router.get("/new", instructorController.newInstructor)
router.get("/", instructorController.getAllInstructors)

router.get("/:id", instructorController.getInstructorById)

module.exports = router
