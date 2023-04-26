const { Schema } = require('mongoose');
const shortId = require('./types/short-id');

const EducationSchema = new Schema({
  shortId,// 나중에 필요없으면 제거 
  school_name: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  graduate_status: {
    type: String,
    required: true,
  },
  created_at: {
    timestamps: true,
  },
  updated_at: {
    timestamps: true,
  },
});

module.exports = EducationSchema;