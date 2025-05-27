import Booking from "../models/BookingSchema";
import mongoose from "mongoose";
export const getAllBookings = async () => {
  return await Booking.find();
};

export const getBookingsById = async (id: string) => {
  const booking = await Booking.findOne({ id: id });
  if (!booking) {
    throw new Error("Booking not found");
  }
  return booking;
};
