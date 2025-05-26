import UserList from "./../data/users.json";

export const getAllUsers = () => {
  return UserList;
};

export const getUsersById = (id: string) => {
  const user = UserList.find((user) => user.id === id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};