const router = require("express").Router();
const c = require("../controllers/instructors");

router.post("/", c.createInstructor);
router.get("/", c.getAllInstructors);
router.get("/:id", c.getInstructorById);

module.exports = router;
