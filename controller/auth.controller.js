import { registeruser } from '../services/auth.service.js';

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const user = await registeruser({ firstname, lastname, email, password });

    return res.status(201).json({
      message: 'user created',
      data: {
        userID: user.id,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
