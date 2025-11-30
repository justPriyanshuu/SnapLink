import { db } from '../db/index.js';
import { usersTable } from '../models/user.model.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export const registeruser = async ({ firstname, lastname, email, password }) => {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser)
    return res.status(404).json({
      error: `User with email ${email} already exists!`,
    });

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await db
    .insert(usersTable)
    .values({
      email,
      firstname,
      lastname,
      hashedPassword,
    })
    .returning({ id: usersTable.id });

  return { id: user.id };
};
