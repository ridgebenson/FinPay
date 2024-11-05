import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export { hashPassword, comparePassword };