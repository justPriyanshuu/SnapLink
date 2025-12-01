import express from 'express';

import { validate } from '../middlewares/validate.middleware.js';
import { signupSchema } from '../validation/signup.validation.js';
import { signup, login } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.get('/profile', isAuthenticated, (req, res) => {
  res.json({ message: 'Protected', userId: req.user.id });
});

export default router;
