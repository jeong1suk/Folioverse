const { Schema } = require('mongoose');

const EducationSchema = new Schema(
  {
  id: {ref: 'User'},
  school_name: { type: String, required: true },
  major: { type: String, required: true },
  graduate_status: { type: String, required: true },  
  },
  {timestamps: true}
);

module.exports = EducationSchema;



// Table education {
//   id objectId [primary key]
//   school_name varchar [not null]
//   major varchar [not null]
//   graduate_status varchar [not null]
//   created_at timestamp
//   updated_at timestamp
// }

