import RoomList from "./../data/rooms.json";

export const getAllRooms = () => {
  return RoomList;
};

export const getRoomById = (id: number) => {
  const room = RoomList.find((room) => room.roomNumber === id);
  if (!room) {
    throw new Error("Room not found");
  }
  return room;
};
