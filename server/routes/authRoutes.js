import express from 'express';

import { authUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);

// Google OAuth Routes


export default router;
