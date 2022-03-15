import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
  title: String,
  description: String,
  createdBy: Schema.Types.ObjectId,
});

export default mongoose.models.Task || model("Task", TaskSchema);
