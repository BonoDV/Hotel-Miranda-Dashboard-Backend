import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import { connectDB } from "./db";
import Room from "./models/RoomSchema";
import User from "./models/UserSchema";
import Booking from "./models/BookingSchema";
import Contact from "./models/ContactSchema";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedRooms() {
  await Room.deleteMany({});
  const roomTypes = ["Single", "Double", "Suite"];
  const bedTypes = ["Single", "Double", "Queen", "King"];
  const amenitiesList = [
    "Air Aconditioner",
    "High speed WiFi",
    "Breakfast",
    "Kitchen",
    "Cleaning",
    "Shower",
    "Grocery",
    "Single bed",
    "Shop near",
    "Towels",
    "24/7 Online Support",
    "Strong Locker",
    "Smart Security",
    "Expert Team",
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
        faker.image.urlLoremFlickr({ category: "nature" }),
        faker.image.urlLoremFlickr({ category: "city" }),
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
  await User.deleteMany({});
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

    const specialRequestStatus = faker.datatype.boolean();
    bookings.push({
      id: uuidv4(),
      name,
      image: faker.image.avatar(),
      orderDate: faker.date.past().toISOString().split("T")[0],
      checkIn,
      checkOut,
      specialRequest: {
        status: specialRequestStatus,
        text: specialRequestStatus ? faker.lorem.sentence() : "",
      },
      roomType,
      status: faker.helpers.arrayElement([
        "Pending",
        "Booked",
        "Cancelled",
        "Refund",
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

async function seedContacts() {
  await Contact.deleteMany({});
  const contacts = [];

  for (let i = 0; i < 50; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1] || "",
    });
    const phone = faker.phone.number();
    const subject = faker.lorem.sentence();
    const message = faker.lorem.sentence();
    const status = faker.helpers.arrayElement([
      "Published",
      "Archived",
      "Non Actioned",
    ]);

    contacts.push({
      id: uuidv4(),
      contactDate: faker.date.past(),
      firstNameCustomer: name.split(" ")[0],
      lastNameCustomer: name.split(" ")[1] || "",
      emailCustomer: email,
      phoneCustomer: phone,
      subject,
      message,
      status,
    });
  }

  await Contact.insertMany(contacts);
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
    case "contacts":
      await seedContacts();
      break;
    case "all":
      await seedRooms();
      await seedUsers();
      await seedBookings();
      await seedContacts();
      break;
    default:
      console.log(
        "Usa: npx ts-node seed.ts [rooms|users|bookings|contacts|all]"
      );
  }

  await mongoose.disconnect();
})();
