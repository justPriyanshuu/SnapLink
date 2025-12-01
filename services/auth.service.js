import { db } from '../db/index.js';
import { usersTable } from '../models/user.model.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const registerUser = async ({ firstname, lastname, email, password }) => {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser)
    throw {
      status: 400,
      message: 'User already exists!',
    };

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await db
    .insert(usersTable)
    .values({
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: hashedPassword,
    })
    .returning({ id: usersTable.id });

  return { id: user[0].id };
};

export const getUserByEmail = async (email, password) => {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

  if (!user) {
    throw {
      status: 404,
      error: `User with email ${email} does not exist`,
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw {
      status: 400,
      error: `Invalid Password`,
    };
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    'process.env.JWT_TOKEN'
  );

  return { token };
};
