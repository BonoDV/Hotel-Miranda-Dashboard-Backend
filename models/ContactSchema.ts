import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ContactSchema = new Schema({
  id: { type: String, unique: true },
  contactDate: Date,
  firstNameCustomer: String,
  lastNameCustomer: String,
  emailCustomer: String,
  phoneCustomer: String,
  subject: String,
  message: String,
  status: {
    type: String,
    enum: ["Published", "Archived", "Non Actioned"],
    default: "Non Actioned",
  },
});

export default model("Contact", ContactSchema);
