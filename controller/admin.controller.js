const bcrypt = require('bcryptjs')

//Validation
const validateLogin = require('../validation/login.validate')
const validateAdmin = require('../validation/adminRegister.validate')

//Models
const Admin = require('../models/admin.model')
const Application = require('../models/application.model')

//utils
const jwtSign = require('../utils/jwtSign')
const joiHelper = require('../utils/joi-validation')

module.exports = {
  registerAdmin: async (req, res) => {
    try {
      const {
        avatar,
        password,
        name,
        email,
        contact_number,
        is_admin,
      } = req.body

      let admin = await Admin.findOne({ email })
      if (admin) {
        return res.status(400).json({
          message: 'Email already exist',
        })
      }
      //VALIDATE REQUEST BODY
      const { error } = validateAdmin(req.body)
      if (error)
        return res
          .status(400)
          .json({ message: error.details[0].message })

      const newAdmin = new Admin({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        avatar,
        contact_number,
        is_admin,
      })

      await newAdmin.save()
      return res.status(200).json({
        message: 'Your request has been sent for approval',
        response: newAdmin,
      })
    } catch (error) {
      return res.status(error?.statusCode || 400).json({
        message: error.message || 'Something went Wrong',
      })
    }
  },

  adminLogin: async (req, res) => {
    try {
      if (joiHelper(validateLogin, req.body, res)?.statusCode)
        return
      const { email, password } = req.body

      const admin = await Admin.findOne({ email })

      if (!admin)
        return res
          .status(404)
          .json({ message: 'Email not found' })

      if (!admin.is_admin)
        return res.status(400).json({
          message: 'Your request for approval is pending',
        })

      const isCorrect = await bcrypt.compare(
        password,
        admin.password
      )

      if (!isCorrect) {
        return res
          .status(404)
          .json({ message: 'Incorrect Password' })
      }
      const payload = {
        id: admin.id 
      } 
      console.log(payload)
      const token = jwtSign(payload)
console.log(token) 
      res
        .status(200)
        .json({ message: 'Login successfully',  token })
    } catch (err) {
      res
        .status(err?.statusCode || 500)
        .json({ message: err.message || 'Something went wrong' })
    } 
  },

  fetchAdmins: async (req, res) => {
    try {
      const admins = await Admin.find({ is_admin: fasle })

      if (!admins)
        return res
          .status(404)
          .json({ message: 'No request pending' })

      res.status(200).json({ result: admins })
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Someting went wrong',
      })
    }
  },

  respondAdmin: async (req, res) => {
    try {
      const { response } = res.body
      const id = req.params.id

      const admin = await Admin.findById(id)
      if (!response) {
        await admin.delete()
        return req
          .status(200)
          .json({ message: 'Request rejected successfully' })
      }
      admin.is_admin = true
      await admin.save()
      res.status(201).json({ message: 'Request approved' })
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Someting went wrong',
      })
    }
  },

  fetchQueryApplicatoins: async (req, res) => {
    try {
      const { program, list, shift, num_student } = req.query

      const applications = await Application.find({
        program,
        list,
        shift,
      }).limit(num_student)

      if (!applications.length)
        return res.status(404).json({
          message: 'No Applications Found',
        })
      res.status(200).json({
        applications,
        message: 'Applications Fetched',
      })
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Someting went wrong',
      })
    }
  },
  fetchQueryByCnic: async (req, res) => {
    try {
      
      const { cnic } = req.query
      const application = await Application.findOne({ cnic:cnic })
       if (!application)
        return res.status(404).json({
          message: 'No Applications Found',
        })
      res.status(200).json({
        application,
        message: 'Applications Fetched',
      })
    } catch (error) {
      console.log(error)
      res.status(error.status || 500).json({
        message: error.message || 'Someting went wrong',
      })
    }
  },
  fetchApplicatoins: async (req, res) => {
    try {
      const applications = await Application.find({})

      if (!applications.length)
        return res.status(404).json({
          message: 'No Applications Found',
        })
      res.status(200).json({
        applications,
        message: 'Applications Fetched',
      })
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Someting went wrong',
      })
    }
  },
  fetchOneApplicatoin: async (req, res) => {
    try {
      const application = await Application.findById(
        req.params.id
      )
      if (!application)
        return res.status(404).json({
          message: 'No Applications Found',
        })
      res.status(200).json({
        application,
        message: 'Application Fetched',
      })
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Someting went wrong',
      })
    }
  },
}
