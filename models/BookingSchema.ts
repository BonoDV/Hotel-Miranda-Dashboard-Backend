import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BookingSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  image: String,
  orderDate: String,
  checkIn: Date,
  checkOut: Date,
  specialRequest: {
    status: Boolean,
    text: String,
  },
  roomType: String,
  status: String,
  phone: String,
  email: String,
  roomNumber: Number,
});

export default model("Booking", BookingSchema);
