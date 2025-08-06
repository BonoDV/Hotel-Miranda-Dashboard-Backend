import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { getAllContacts } from "../services/contact";

export const contactController = Router();
contactController.get(
  "/contacts",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const contacts = await getAllContacts();
      res.send(contacts);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
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
