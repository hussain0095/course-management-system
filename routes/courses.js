const router = require("express").Router();

const courses = require("../controllers/courses");
const reviews = require("../controllers/reviews");

router.post("/", courses.createCourse);
router.get("/", courses.getAllCourses);
router.get("/:id", courses.getCourseById);

router.post("/update/:id", courses.updateCourse);
router.post("/delete/:id", courses.deleteCourse);

router.post("/:id/reviews", reviews.addReview);
router.get("/:id/reviews", reviews.getReviewsPage);

module.exports = router;
