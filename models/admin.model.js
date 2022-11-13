const { Schema, model } = require('mongoose');

const adminSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      minlength: 8,
      required: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    contact_number: {
      type: Number,
      minlength: 11,
      maxlength: 15,
      required: true,
    },

    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  { strict: false }
);

module.exports = model('admin', adminSchema);
