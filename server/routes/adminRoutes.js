import express from 'express';
import { getPendingUsers, approveUser, rejectUser, getAdminInfo } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/protect.js';

const router = express.Router();

// Public route for getting admin info
router.route('/info').get(getAdminInfo);

// Protected admin routes
router.route('/pending-users').get(protect, admin, getPendingUsers);
router.route('/approve-user/:id').put(protect, admin, approveUser);
router.route('/reject-user/:id').delete(protect, admin, rejectUser);

export default router;
