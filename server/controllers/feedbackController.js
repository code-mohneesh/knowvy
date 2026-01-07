import Feedback from '../models/Feedback.js';

// Submit feedback
export const submitFeedback = async (req, res) => {
    try {
        const { name, email, rating, category, message } = req.body;

        // Validate required fields
        if (!name || !rating || !category || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create feedback
        const feedback = await Feedback.create({
            name,
            email: email || '',
            user: req.user?._id, // Optional, only if user is logged in
            rating,
            category,
            message
        });

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedback
        });
    } catch (error) {
        console.error('Submit feedback error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all feedback (admin only)
export const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.json(feedback);
    } catch (error) {
        console.error('Get feedback error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update feedback status (admin only)
export const updateFeedbackStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const feedback = await Feedback.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        res.json({ message: 'Feedback status updated', feedback });
    } catch (error) {
        console.error('Update feedback error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
