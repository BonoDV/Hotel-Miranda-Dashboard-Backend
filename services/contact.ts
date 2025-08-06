import Contact from "../models/ContactSchema";
import mongoose from "mongoose";

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactsById = async (id: string) => {
  const contact = await Contact.findOne({ id: id });
  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

export const createContact = async (contactData: any) => {
  const newContact = new Contact(contactData);
  newContact.id = new mongoose.Types.ObjectId().toString();

  console.log("DATOS A GUARDAR:", newContact);

  const validationError = newContact.validateSync();
  if (validationError) {
    throw new Error(`Validation failed: ${validationError.message}`);
  }

  const existingContact = await Contact.findOne({ id: newContact.id });
  if (existingContact) {
    throw new Error("Contact with this ID already exists");
  }

  return await newContact.save();
};
