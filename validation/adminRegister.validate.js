const Joi = require('joi');
module.exports = function (admin) {
  const adminSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    contact_number: Joi.string().min(11).max(13).required(),
  });
  return adminSchema.validate(admin);
};
