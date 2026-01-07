import express from 'express';
const router = express.Router();
import { submitFeedback, getAllFeedback, updateFeedbackStatus } from '../controllers/feedbackController.js';
import { protect, admin } from '../middleware/protect.js';

// Public route (can be used by anyone, even non-logged-in users)
router.post('/', submitFeedback);

// Admin routes
router.get('/', protect, admin, getAllFeedback);
router.put('/:id/status', protect, admin, updateFeedbackStatus);

export default router;
