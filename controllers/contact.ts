import { Request, Response, Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  getAllContacts,
  getContactsStatusNonActioned,
  updateContact,
} from "../services/contact";

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

// Get contacts status non actioned
contactController.get(
  "/contacts/status/non-actioned",
  authenticateToken,
  async (req: Request, res: Response) => {
    const contacts = await getContactsStatusNonActioned();
    res.send(contacts);
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
  async (req: Request, res: Response) => {
    const contactId = req.params.id;
    const updatedContactData = req.body;
    try {
      const updatedContact = await updateContact(contactId, updatedContactData);
      res
        .status(200)
        .send(`Contact with ID: ${contactId} updated successfully`);
    } catch (error: any) {
      res.status(500).send({ message: error.message });
    }
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
