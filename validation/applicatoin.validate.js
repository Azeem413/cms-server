const Joi = require('joi')

module.exports = function (form) {
  const applicationSchema = Joi.object({
    shift: Joi.string().valid('morning', 'evening'),
    program: Joi.string()
      .valid('intermediate', 'graduate', 'post graduate')
      .required(),
    list: Joi.string().required(),
    student_name: Joi.string().min(3).max(50).required(),
    student_phone_number: Joi.string()
      .min(11)
      .max(11)
      .required(),
    father_name: Joi.string().min(3).max(50).required(),
    father_phone_number: Joi.string().min(11).max(11).required(),
    cnic: Joi.string().length(13).required(),
    religion: Joi.valid(
      'islam',
      'christian',
      'others'
    ).required(),
    domicile: Joi.string().required(),
    dob: Joi.string().length(10).required(),
    email: Joi.string().email().required(),
    father_occupation: Joi.string().required(),
    father_cnic: Joi.string().length(13).required(),
    guardian_name: Joi.string().min(3).max(50).required(),
    guardian_occupation: Joi.string().required(),
    guardian_phone_number: Joi.string()
      .min(11)
      .max(11)
      .required(),
    current_address: Joi.string().min(20).required(),
    permanent_address: Joi.string().min(20).required(),
    state: Joi.string()
      .valid(
        'punjab',
        'balochistan',
        'sindh',
        'khyber pakhtunkwa',
        'gilgit-baltistan'
      )
      .required(),
    city: Joi.string().required(),
    zip_code: Joi.string().required(),
  })
  return applicationSchema.validate(form)
}
