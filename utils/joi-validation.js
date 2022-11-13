module.exports = function (function_, data, res) {
  const rep = `\"`;
  const { error } = function_(data);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message
        .replace(rep, '')
        .replace(rep, '')
        .replace('_', ' ')
        .replace('_', ' ')
        .replace('_', ' '),
    });
  }
};
