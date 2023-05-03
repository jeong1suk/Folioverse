import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    school_name: { type: String, required: true },
    major: { type: String, required: true },
    graduate_status: { type: String, required: true },
  },
  { timestamps: true }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };

