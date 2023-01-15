const bcrypt = require("bcryptjs");

//models
const Student = require("../models/student.model");
const Application = require("../models/application.model");
const mongoose = require("mongoose");
//utils
const jwtSign = require("../utils/jwtSign");
const joiHelper = require("../utils/joi-validation");
const bufferConversion = require("../utils/bufferConversion");
const cloudinary = require("../utils/cloudinary");

//validations
const validateLogin = require("../validation/login.validate");
const validateUpdatePassword = require("../validation/updatePassword.validate");
const validateApplication = require("../validation/applicatoin.validate");
const validateStudent = require("../validation/studentRegister.validate");
const validateEducation = require("../validation/education.validation");
const Joi = require("joi");
//
module.exports = {
  studentLogin: async (req, res) => {
    try {
      // Check Validation
      if (joiHelper(validateLogin, req.body, res)?.statusCode) return;

      const { email, password } = req.body;

      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(404).json({ message: "Email not found" });
      }
      const isCorrect = await bcrypt.compare(password, student.password);

      if (!isCorrect) {
        return res.status(404).json({ message: "Incorrect Password" });
      }

      const payload = { id: student.id, student };
      const token = jwtSign(payload);
      res.status(200).json({ message: "Login successfully", result: token });
    } catch (error) {
      return res.status(error?.statusCode || 400).json({
        message: error.message || "Something went Wrong",
      });
    }
  },
  fetchOneApplication: async (req, res) => {
    try {
      const application = await Application.findById(req.params.id);
      if (!application)
        return res.status(404).json({
          message: "No Applications Found",
        });
      res.status(200).json({
        application,
        message: "Application Fetched",
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || "Someting went wrong",
      });
    }
  },

  registerStudent: async (req, res) => {
    try {
      const { name, email, password, cpassword } = req.body;
      // console.log(req.body)
      let student = await Student.findOne({ email });
      if (student) {
        return res.status(400).json({
          message: "Email already exist",
        });
      }
      //VALIDATE REQUEST BODY
      if (joiHelper(validateStudent, req.body, res)?.statusCode) return;

      const newstudent = new Student({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        cpassword: password,
      });

      await newstudent.save();

      return res.status(200).json({
        message: "Registered successfully",
        response: newstudent,
      });
    } catch (error) {
      return res.status(error?.status || 400).json({
        message: error.message || "Something went Wrong",
      });
    }
  },

  updatePassword: async (req, res) => {
    try {
      if (joiHelper(validateUpdatePassword, req.body, res)?.statusCode) return;

      const { email, newPassword, confirmNewPassword } = req.body;
      const student = await Student.findOne({ email });

      student.password = await bcrypt.hash(newPassword, 10);
      await student.save();
      res.status(200).json({ message: "Password Updated" });
    } catch (error) {
      return res.status(error?.statusCode || 400).json({
        message: error.message || "Something went Wrong",
      });
    }
  },

  // forgotPassword: async (req, res) => {
  //   try {
  //     const { errors, isValid } = validateForgotPassword(
  //       req.body
  //     );
  //     if (!isValid) {
  //       return res.status(400).json(errors);
  //     }
  //     const { email } = req.body;
  //     const student = await Student.findOne({ email });
  //     if (!student) {
  //       errors.email =
  //         'Email Not found, Provide registered email';
  //       return res.status(400).json(errors);
  //     }
  //     function generateOTP() {
  //       var digits = '0123456789';
  //       let OTP = '';
  //       for (let i = 0; i < 6; i++) {
  //         OTP += digits[Math.floor(Math.random() * 10)];
  //       }
  //       return OTP;
  //     }
  //     const OTP = await generateOTP();
  //     student.otp = OTP;
  //     await student.save();
  //     await sendEmail(student.email, OTP, 'OTP');
  //     res.status(200).json({
  //       message: 'check your registered email for OTP',
  //     });
  //     const helper = async () => {
  //       student.otp = '';
  //       await student.save();
  //     };
  //     setTimeout(function () {
  //       helper();
  //     }, 300000);
  //   } catch (err) {
  //     console.log('Error in sending email', err.message);
  //   }
  // },

  postOTP: async (req, res) => {
    try {
      const { errors, isValid } = validateOTP(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { email, otp, newPassword, confirmNewPassword } = req.body;
      if (newPassword !== confirmNewPassword) {
        errors.confirmNewPassword = "Password Mismatch";
        return res.status(400).json(errors);
      }
      const student = await Student.findOne({ email });
      if (student.otp !== otp) {
        errors.otp = "Invalid OTP, check your email again";
        return res.status(400).json(errors);
      }
      let hashedPassword;
      hashedPassword = await bcrypt.hash(newPassword, 10);
      student.password = hashedPassword;
      await student.save();
      return res.status(200).json({ message: "Password Changed" });
    } catch (err) {
      console.log("Error in submitting otp", err.message);
      return res.status(200);
    }
  },
  updateApplication: async (req, res) => {
    const { id } = req.params;
    // const { form, intermediate, graduate, metric } = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(404)
          .json({ message: `No student exist with id: ${id}` });
      }

      // const updatedForm = {
      //   form,
      //   intermediate,
      //   graduate,
      //   metric,
      //   _id: id,
      // };
      const result = await Application.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // console.log(result);
      res.json({ result, message: "your form updated sucessfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  //   employeeModel.findById(req.params.id, function (err, employee) {
  //   if (!employee)
  //   return next(new Error('Unable To Find Employee With This Id'));
  //   else {
  //   employee.firstName = req.body.firstName;
  //   employee.lastName = req.body.lastName;
  //   employee.email = req.body.email;
  //   employee.phone = req.body.phone;

  //   employee.save().then(emp => {
  //   res.json('Employee Updated Successfully');
  //   })
  //   .catch(err => {
  //   res.status(400).send("Unable To Update Employee");
  //   });
  //   }
  //   });
  //   });

  postApplication: async (req, res) => {
    try {
      const { form, metric, intermediate, graduate } = req.body;
      console.log(form);
      if (
        joiHelper(validateApplication, form, res)?.statusCode ||
        joiHelper(validateEducation, metric, res)?.statusCode
      )
        return;
      metric.percentage = (metric.obtain_marks / metric.total_marks) * 100;
      form.metric = metric;
      if (form.program === "graduate" || form.program === "post graduate") {
        if (joiHelper(validateEducation, intermediate, res)?.statusCode) return;
        intermediate.percentage =
          (intermediate.obtain_marks / intermediate.total_marks) * 100;
        form.intermediate = intermediate;
      }

      if (form.program === "post graduate") {
        if (joiHelper(validateEducation, graduate, res)?.statusCode) return;
        graduate.percentage =
          (graduate.obtain_marks / graduate.total_marks) * 100;
        form.graduate = graduate;
      }
      // applied_by: req.userId;

      res.status(201).json({
        result: await Application.create(form),
        message: "your form submitted",
      });
    } catch (error) {
      return res.status(error?.statusCode || 400).json({
        message: error.message || "Something went Wrong",
      });
    }
  },
};
