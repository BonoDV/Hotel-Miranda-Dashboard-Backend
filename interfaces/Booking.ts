export type Bookings = {
  id: string;
  name: string;
  image: string;
  orderDate: string;
  checkIn: string;
  checkOut: string;
  specialRequest: {
    status: boolean;
    text: string;
  };
  roomType: string;
  status: string;
  phone: string;
  email: string;
};
