import { faker } from "@faker-js/faker";
import { run } from "./db";
import { v4 as uuidv4 } from "uuid";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  try {
    const client = await run();
    console.log("Connected correctly to server");

    const db = client.db("Hotel_Dashboard");

    const bookingsCollection = db.collection("bookings");
    const usersCollection = db.collection("users");
    const roomsCollection = db.collection("rooms");

    const bookings = [];
    const users = [];
    const rooms = [];

    // ROOMS
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

    for (let i = 0; i < 30; i++) {
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

    // USERS (Staff/Admins)
    const jobRoles = [
      "Receptionist",
      "Manager",
      "Cleaner",
      "Chef",
      "Concierge",
    ];
    const schedules = ["Morning", "Evening", "Night"];

    for (let i = 0; i < 20; i++) {
      const first_name = faker.person.firstName();
      const last_name = faker.person.lastName();
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
        password: faker.internet.password(), // hash it in production
      });
    }

    // BOOKINGS
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
          lastName: name.split(" ")[1],
        }),
      });
    }

    // Insert in DB
    await usersCollection.insertMany(users);
    await roomsCollection.insertMany(rooms);
    await bookingsCollection.insertMany(bookings);

    console.log("Database seeded successfully 🚀");

    await client.close();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.stack);
    } else {
      console.error("Unexpected error:", err);
    }
  }
}

seedDB();
