const Joi = require('joi')
module.exports = function (education) {
  const educationSchema = Joi.object({
    year: Joi.string().length(4).required(),
    roll_number: Joi.string().required(),
    obtain_marks: Joi.string().required(),
    total_marks: Joi.string().required(),
    subject: Joi.string().required(),
    board: Joi.string().required(),
    institute: Joi.string().required(),
  })
  return educationSchema.validate(education)
}
