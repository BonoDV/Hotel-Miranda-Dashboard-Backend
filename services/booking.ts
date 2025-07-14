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

export const createBooking = async (bookingData: any) => {
  // Normalizar fechas
  if (bookingData.checkIn?.$date) {
    bookingData.checkIn = new Date(bookingData.checkIn.$date);
  }
  if (bookingData.checkOut?.$date) {
    bookingData.checkOut = new Date(bookingData.checkOut.$date);
  }

  const newBooking = new Booking(bookingData);
  newBooking.id = new mongoose.Types.ObjectId().toString();

  console.log("DATOS A GUARDAR:", newBooking);

  const validationError = newBooking.validateSync();
  if (validationError) {
    throw new Error(`Validation failed: ${validationError.message}`);
  }

  const existingBooking = await Booking.findOne({ id: newBooking.id });
  if (existingBooking) {
    throw new Error("Booking with this ID already exists");
  }

  return await newBooking.save();
};

export const updateBooking = async (id: string, bookingData: any) => {
  const booking = await Booking.findOne({ id: id });
  if (!booking) {
    throw new Error("Booking not found");
  }
  // Normalizar fechas
  if (bookingData.checkIn?.$date) {
    bookingData.checkIn = new Date(bookingData.checkIn.$date);
  }
  if (bookingData.checkOut?.$date) {
    bookingData.checkOut = new Date(bookingData.checkOut.$date);
  }
  Object.assign(booking, bookingData);
  const validationError = booking.validateSync();
  if (validationError) {
    throw new Error(`Validation failed: ${validationError.message}`);
  }
  return await booking.save();
};

export const deleteBooking = async (id: string) => {
  const booking = await Booking.findOne({ id: id });
  if (!booking) {
    throw new Error("Booking not found");
  }
  await Booking.deleteOne({ id: id });
  return { message: "Booking deleted successfully" };
};
