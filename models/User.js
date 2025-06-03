import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  name: { type: String },
  profilepic: { type: String },
  coverpic: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// ✅ Prevent model overwrite issue
const User = models.User || model("User", UserSchema);

export default User;
