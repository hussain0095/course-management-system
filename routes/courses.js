const router = require("express").Router();

const courses = require("../controllers/courses");
const reviews = require("../controllers/reviews");

// FULL CRUD
router.post("/", courses.createCourse);
router.get("/", courses.getAllCourses); 
router.get("/:id", courses.getCourseById);
router.put("/:id", courses.updateCourse);
router.delete("/:id", courses.deleteCourse);


router.post("/:id/reviews", reviews.addReview);
router.put("/:courseId/reviews/:reviewId", reviews.updateReview);
router.delete("/:courseId/reviews/:reviewId", reviews.deleteReview);

module.exports = router;
