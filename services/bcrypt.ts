import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(plainPassword: string): Promise<string> {
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
}
