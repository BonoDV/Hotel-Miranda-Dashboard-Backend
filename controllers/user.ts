import { Request, Response, Router } from "express";

export const usersController = Router();

// Get all users
usersController.get("/users", (req: Request, res: Response) => {
  res.send("Users page");
});

// Get user by ID
usersController.get("/users/:id", (req: Request, res: Response) => {
  const userId = req.params.id;
  res.send(`User details for ID: ${userId}`);
});

// Create a new user
usersController.post("/users", (req: Request, res: Response) => {
  const newUser = req.body;
  res.status(201).send(`New user created: ${JSON.stringify(newUser)}`);
});

// Update user by ID
usersController.put("/users/:id", (req: Request, res: Response) => {
  const userId = req.params.id;
  res.send(`User with ID: ${userId} updated`);
});

// Delete user by ID
usersController.delete("/users/:id", (req: Request, res: Response) => {
  const userId = req.params.id;
  res.send(`User with ID: ${userId} deleted`);
});

export default usersController;