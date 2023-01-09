const express = require("express");
const passport = require("passport");
const router = express.Router();
// const upload = require('../middlewares/multer.middleware');

const {
  studentLogin,
  registerStudent,
  updatePassword,
  // forgotPassword,
  postOTP,
  postApplication,
  updateApplication,
  fetchOneApplication,
} = require("../controller/student.controller");

// router.get('/takeQuiz', takeQuiz);

router.post("/login", studentLogin);

// router.post('/forgot/password', forgotPassword);

router.post("/register", registerStudent);

router.post("/postOTP", postOTP);

router.post("/update/password", updatePassword);
router.get("/edit/:id", fetchOneApplication);

router.post("/submit/application", postApplication);
router.put("/edit/:id", updateApplication);

//CHAT RELATED ROUTES
module.exports = router;
