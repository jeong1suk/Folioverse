import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    disvison: { type: String, required: true },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    date: { type: String },
    tech_stack: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };

// Table project {
//   id objecrId [primary key]
//   name varchar [not null]
//   division varchar [not null]
//   description varchar
//   date varchar [not null]
//   tech_stack varchar
//   link varchar
// }
