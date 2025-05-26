import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RoomSchema = new Schema({
  roomNumber: { type: Number, required: true, unique: true },
  roomType: String,
  bedType: String,
  roomFloor: String,
  photos: [String],
  description: String,
  offer: { type: String, enum: ["YES", "NO"] },
  price: Number,
  discount: Number,
  cancellation: String,
  amenities: [String],
});

export default model("Room", RoomSchema);
