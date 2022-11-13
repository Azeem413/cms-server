const Joi = require('joi');

module.exports = function (subejct) {
  const studentSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    cpassword: Joi.valid(Joi.ref('password')).required(),
  });
  return studentSchema.validate(subejct);
};
