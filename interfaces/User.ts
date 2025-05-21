export type Concierge = {
  id: string;
  photo: string;
  first_name: string;
  last_name: string;
  job: string;
  email: string;
  phone_number: string;
  start_date: Date;
  schedule: string;
  function_description: string;
  status: boolean;
  password: string; // hashed
};
