const { Schema } = require('mongoose');

const ProjectSchema = new Schema(
  {
  name: { type: String, required: true },
  disvison: {type: String, required: true},
  description: { type: String, required: false, default: "설명이 아직 없습니다. 추가해 주세요." },
  date: { type: string },
  tech_stack: {type: String},
  link: { type:String },
},
  {timestamps: true}
);

module.exports = ProjectSchema;

  // Table project {
  //   id objecrId [primary key]
  //   name varchar [not null]
  //   division varchar [not null]
  //   description varchar 
  //   date varchar [not null]
  //   tech_stack varchar
  //   link varchar
  // }
  