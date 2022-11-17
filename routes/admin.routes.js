const express = require('express')
const router = express.Router()
// const passport = require('passport');
// const upload = require('../middlewares/multer.middleware');
const {
  registerAdmin,
  adminLogin,
  fetchAdmins,
  respondAdmin,
  fetchApplicatoins,
  fetchQueryApplicatoins,
  fetchOneApplicatoin,
  fetchQueryByCnic
} = require('../controller/admin.controller')

router.post('/register/admin', registerAdmin)
router.post('/login', adminLogin)
router.post('/fetch/admins', fetchAdmins)
router.post('/respond/admin', respondAdmin)

router.get('/fetch/applications', fetchApplicatoins)
router.get('/fetch/application/:id', fetchOneApplicatoin)
router.get('/fetch/cnic/application', fetchQueryByCnic)
router.get('/fetch/query/applications', fetchQueryApplicatoins)

module.exports = router
