import bcrypt from 'bcrypt';

export async function hashUserPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(storedPassword, suppliedPassword) {
  return await bcrypt.compare(suppliedPassword, storedPassword);
}
