import BookingList from "./../data/bookings.json";
import Booking from "../models/BookingSchema";

export const getAllBookings = async () => {
  return await Booking.find({})
};

export const getBookingsById = async (id: string) => {
  const booking = await Booking.findById(id);
  if (!booking) {
    throw new Error("Booking not found");
  }
  return booking;
};
