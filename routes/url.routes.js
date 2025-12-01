import express from 'express';
import { shortenUrl, shortCode, allCode } from '../controllers/url.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/shorten', isAuthenticated, shortenUrl);

router.get('/allcode', isAuthenticated, allCode);

router.get('/:shortCode', shortCode);

export default router;
