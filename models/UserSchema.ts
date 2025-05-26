import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  photo: String,
  first_name: String,
  last_name: String,
  job: String,
  email: { type: String, required: true, unique: true },
  phone_number: String,
  start_date: Date,
  schedule: String,
  function_description: String,
  status: Boolean,
  password: String, // hashed
});

export default model("User", UserSchema);
