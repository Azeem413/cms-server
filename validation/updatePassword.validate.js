const Joi = require('joi');
module.exports = function (data) {
  const updatePassword = Joi.object({
    newPassword: Joi.string().min(8).required(),
    confirmNewPassword: Joi.valid(
      Joi.ref('newPassword')
    ).required(),
  });
  return updatePassword.validate(data);
};
