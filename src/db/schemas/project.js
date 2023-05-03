import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    division: { type: String, required: true },
    description: { type: String },
    date: { type: String },
    tech_stack: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };


