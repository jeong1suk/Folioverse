import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    disvison: { type: String, required: true },
    description: { type: String },
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
