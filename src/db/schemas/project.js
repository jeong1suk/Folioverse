const { Schema } = require('mongoose');
const shortId = require('./types/short-id');

const ProjectSchema = new Schema({
  shortId, //나중에 ㅂㅂ
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordReset: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = ProjectSchema;