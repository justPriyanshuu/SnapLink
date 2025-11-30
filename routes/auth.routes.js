import express from 'express';

import { validate } from '../middlewares/validate.middleware.js';
import { signupSchema } from '../validation/signup.validation.js';
import { signup } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);

export default router;
