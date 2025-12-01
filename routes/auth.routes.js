import express from 'express';

import { validate } from '../middlewares/validate.middleware.js';
import { signupSchema } from '../validation/signup.validation.js';
import { signup , login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup' , signup);

router.post('/login', login)

export default router;
