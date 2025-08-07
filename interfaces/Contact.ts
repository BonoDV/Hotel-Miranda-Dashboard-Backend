export enum ContactStatus {
  PUBLISHED = "Published",
  ARCHIVED = "Archived",
  NON_ACTIONED = "Non Actioned",
}

export type Contact = {
  contactDate: string;
  photo: string;
  id: string;
  firstNameCustomer: string;
  lastNameCustomer: string;
  emailCustomer: string;
  phoneCustomer: string;
  subject: string;
  message: string;
  status: ContactStatus;
};
