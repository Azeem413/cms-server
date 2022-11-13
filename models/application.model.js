const { Schema, model } = require('mongoose')

const educationSchema = new Schema({
  year: {
    type: String,
    length: 10,
    required: true,
  },

  roll_number: {
    type: String,
    required: true,
  },

  obtain_marks: {
    type: String,
    required: true,
  },

  total_marks: {
    type: String,
    required: true,
  },

  percentage: {
    type: String,
    required: true,
  },

  subject: {
    type: String,
    required: true,
  },

  board: {
    type: String,
    default: 'lahore',
  },

  institute: {
    type: String,
    required: true,
  },
})

const formSchema = new Schema({
  shift: {
    type: String,
    enum: ['morning', 'evening'],
    default: 'morning',
  },
  program: {
    type: String,
    enum: ['intermediate', 'graduate', 'post graduate'],
    default: 'intermediate',
  },
  list: {
    type: String,
    required: true,
  },
  student_name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  student_phone_number: {
    type: String,
    length: 11,
    required: true,
  },
  father_name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  father_phone_number: {
    type: String,
    length: 11,
    required: true,
  },
  cnic: {
    type: String,
    length: 13,
    required: true,
  },
  religion: {
    type: String,
    enum: ['islam', 'christian', 'hindu', 'others'],
    default: 'islam',
  },
  domicile: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    length: 10,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  father_occupation: {
    type: String,
    required: true,
  },

  father_cnic: {
    type: String,
    length: 13,
    required: true,
  },

  guardian_name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: true,
  },

  guardian_occupation: {
    type: String,
    required: true,
  },
  guardian_phone_number: {
    type: String,
    length: 11,
    required: true,
  },
  current_address: {
    type: String,
    minlength: 20,
    required: true,
  },
  permanent_address: {
    type: String,
    minlength: 20,
    required: true,
  },

  state: {
    type: String,
    enum: [
      'punjab',
      'balochistan',
      'sindh',
      'khyber pakhtunkwa',
      'gilgit-baltistan',
    ],
    default: 'punjab',
  },

  city: {
    type: String,
    required: true,
  },

  applied_by: {
    type: Schema.Types.ObjectId,
    ref: 'student',
  },
  zip_code: {
    type: String,
    required: true,
  },
  is_ok: {
    type: Boolean,
    default: false,
  },

  respond: {
    type: Boolean,
    default: false,
  },

  metric: educationSchema,
  intermediate: educationSchema,
  graduate: educationSchema,
})

module.exports = model('form', formSchema)
