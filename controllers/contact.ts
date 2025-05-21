import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";

export const contactController = Router();

// Get all contacts
contactController.get(
  "/contacts",
  authenticateToken,
  (req: Request, res: Response) => {
    res.send("Contacts page");
  }
);

// Get contact by ID
contactController.get(
  "/contacts/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const contactId = req.params.id;
    res.send(`Contact details for ID: ${contactId}`);
  }
);

// Create a new contact
contactController.post(
  "/contacts",
  authenticateToken,
  (req: Request, res: Response) => {
    const newContact = req.body;
    res.status(201).send(`New contact created: ${JSON.stringify(newContact)}`);
  }
);

// Update contact by ID
contactController.put(
  "/contacts/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const contactId = req.params.id;
    res.send(`Contact with ID: ${contactId} updated`);
  }
);

// Delete contact by ID
contactController.delete(
  "/contacts/:id",
  authenticateToken,
  (req: Request, res: Response) => {
    const contactId = req.params.id;
    res.send(`Contact with ID: ${contactId} deleted`);
  }
);

export default contactController;
