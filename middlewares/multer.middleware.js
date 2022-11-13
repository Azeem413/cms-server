const multer = require('multer')

//Specify the storage engine
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
  fileFilter: function (req, { mimetype }, done) {
    if (
      mimetype === 'image/jpeg' ||
      mimetype === 'image/png' ||
      mimetype === 'image/jpg' ||
      mimetype === 'application/pdf'
    ) {
      done(null, true)
    } else {
      //prevent the upload
      var newError = new Error('File type is incorrect')
      newError.name = 'MulterError'
      done(newError, false)
    }
  },
})

module.exports = upload
