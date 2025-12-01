import express from 'express';
import { shortenUrl } from '../controllers/url.controller.js';
const router = express.Router();

router.post('/', shortenUrl);

export default router;
