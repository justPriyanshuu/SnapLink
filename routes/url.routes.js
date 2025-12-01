import express from 'express';
import { shortenUrl, shortCode, allCode, deleteUrl } from '../controllers/url.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/shorten', isAuthenticated, shortenUrl);

router.get('/allcode', isAuthenticated, allCode);

router.delete('/:id', isAuthenticated, deleteUrl);

router.get('/:shortCode', shortCode);

export default router;
