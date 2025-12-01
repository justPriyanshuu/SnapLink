import { registerUser, getUserByEmail } from '../services/auth.service.js';

export const signup = async (req, res) => {
  try {
    console.log('controller received body:', req.body);

    const { firstname, lastname, email, password } = req.body;

    const user = await registerUser({ firstname, lastname, email, password });

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

export const login = async (req, res) => {
  try {
    console.log('controller received body:', req.body);

    const { email, password } = req.body;

    const user = await getUserByEmail(email, password);

    return res.status(201).json({
      message: 'Login Successful',
      data: {
        Token: user,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
