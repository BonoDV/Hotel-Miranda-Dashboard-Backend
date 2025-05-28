import mongoose from "mongoose";
import Room from "../models/RoomSchema";

export const getAllRooms = async () => {
  return await Room.find({});
};

export const getRoomById = async (roomNumber: Number) => {
  const room = await Room.findOne({ roomNumber: roomNumber });
  if (!room) {
    throw new Error("Room not found");
  }
  return room;
};

export const createRoom = async (roomData: JSON) => {
  const newRoom = new Room(roomData);

  const validationError = newRoom.validateSync();
  if (validationError) {
    throw new Error(`Validation failed: ${validationError.message}`);
  }

  const existingRoom = await Room.findOne({
    roomNumber: newRoom.roomNumber,
  });
  if (existingRoom) {
    throw new Error("Room with this roomNumber already exists");
  }

  return await newRoom.save();
};

export const updateRoom = async (roomNumber: Number, roomData: JSON) => {
  const room = await Room.findOne({ roomNumber: roomNumber });
  if (!room) {
    throw new Error("Room not found");
  }

  Object.assign(room, roomData);
  const validationError = room.validateSync();
  if (validationError) {
    throw new Error(`Validation failed: ${validationError.message}`);
  }
  return await room.save();
};

export const deleteRoom = async (roomNumber: Number) => {
  const room = await Room.findOne({ roomNumber: roomNumber });
  if (!room) {
    throw new Error("Room not found");
  }
  await Room.deleteOne({ roomNumber: roomNumber });
  return { message: "Room deleted successfully" };
};
