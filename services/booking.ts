import BookingList from "./../data/bookings.json";

export const getAllBookings = () => {
  return BookingList;
};

export const getBookingsById = (id: string) => {
  const booking = BookingList.find((booking) => booking.id === id);
  if (!booking) {
    throw new Error("Booking not found");
  }
  return booking;
};
