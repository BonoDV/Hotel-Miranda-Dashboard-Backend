import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import { connectDB } from "./db";
import Room from "./models/RoomSchema";
import User from "./models/UserSchema";
import Booking from "./models/BookingSchema";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedRooms() {
  const roomTypes = ["Single", "Double", "Suite"];
  const bedTypes = ["Single", "Double", "Queen", "King"];
  const amenitiesList = [
    "Wi-Fi",
    "TV",
    "Minibar",
    "Air Conditioning",
    "Safe",
    "Balcony",
    "Coffee Maker",
  ];
  const cancellationPolicies = [
    "Free cancellation",
    "Non-refundable",
    "Partial refund",
  ];

  const rooms = [];

  for (let i = 0; i < 50; i++) {
    rooms.push({
      roomNumber: 100 + i,
      roomType: faker.helpers.arrayElement(roomTypes),
      bedType: faker.helpers.arrayElement(bedTypes),
      roomFloor: `${randomInt(1, 5)}`,
      photos: [
        faker.image.urlLoremFlickr({ category: "hotel" }),
        faker.image.urlLoremFlickr({ category: "interior" }),
      ],
      description: faker.lorem.paragraph(),
      offer: faker.helpers.arrayElement(["YES", "NO"]),
      price: randomInt(80, 500),
      discount: faker.datatype.boolean() ? randomInt(5, 25) : 0,
      cancellation: faker.helpers.arrayElement(cancellationPolicies),
      amenities: faker.helpers.arrayElements(amenitiesList, randomInt(3, 6)),
    });
  }

  await Room.insertMany(rooms);
}

async function seedUsers() {
  const jobRoles = ["Receptionist", "Manager", "Cleaner", "Chef", "Concierge"];
  const schedules = ["Morning", "Evening", "Night"];

  const users = [];

  for (let i = 0; i < 20; i++) {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const plainPassword = faker.internet.password();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    users.push({
      id: uuidv4(),
      photo: faker.image.avatar(),
      first_name,
      last_name,
      job: faker.helpers.arrayElement(jobRoles),
      email: faker.internet.email({
        firstName: first_name,
        lastName: last_name,
      }),
      phone_number: faker.phone.number(),
      start_date: faker.date.past({ years: 5 }),
      schedule: faker.helpers.arrayElement(schedules),
      function_description: faker.lorem.sentence(),
      status: faker.datatype.boolean(),
      password: hashedPassword,
    });
  }

  await User.insertMany(users);
}

async function seedBookings() {
  await Booking.deleteMany({});
  const roomTypes = ["Single", "Double", "Suite"];
  const bookings = [];

  for (let i = 0; i < 50; i++) {
    const roomType = faker.helpers.arrayElement(roomTypes);
    const checkIn = faker.date.between({
      from: "2024-07-01",
      to: "2024-12-01",
    });
    const checkOut = faker.date.soon({
      days: randomInt(1, 14),
      refDate: checkIn,
    });
    const name = faker.person.fullName();

    bookings.push({
      id: uuidv4(),
      name,
      image: faker.image.avatar(),
      orderDate: faker.date.past().toISOString().split("T")[0],
      checkIn,
      checkOut,
      specialRequest: {
        status: faker.datatype.boolean(),
        text: faker.lorem.sentence(),
      },
      roomType,
      status: faker.helpers.arrayElement([
        "Booked",
        "Checked In",
        "Checked Out",
        "Cancelled",
      ]),
      phone: faker.phone.number(),
      email: faker.internet.email({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
      }),
      roomNumber: 100 + i,
    });
  }

  await Booking.insertMany(bookings);
}

const args = process.argv.slice(2);

(async () => {
  await connectDB();

  switch (args[0]) {
    case "rooms":
      await seedRooms();
      break;
    case "users":
      await seedUsers();
      break;
    case "bookings":
      await seedBookings();
      break;
    case "all":
      await seedRooms();
      await seedUsers();
      await seedBookings();
      break;
    default:
      console.log("Usa: npx ts-node seed.ts [rooms|users|bookings|all]");
  }

  await mongoose.disconnect();
})();
