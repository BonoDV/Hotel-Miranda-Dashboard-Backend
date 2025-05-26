import RoomList from "./../data/rooms.json";
import Room from "../models/RoomSchema";

export const getAllRooms = async () => {
  return await Room.find({});
};

export const getRoomById = async (id: number) => {
  const room = await Room.findById(id);
  if (!room) {
    throw new Error("Room not found");
  }
  return room;
};
