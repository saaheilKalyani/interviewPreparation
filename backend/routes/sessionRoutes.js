const express = require('express');
const { createSession, getMySessions, getSessionById, deleteSessions } = require('../controllers/sessionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create',protect, createSession); // Create a new session
router.get('/my-sessions', protect, getMySessions); // Get all sessions for the authenticated user
router.get('/:id', protect, getSessionById); // Get session by ID   
router.delete('/:id', protect, deleteSessions); // Delete a session by ID

module.exports = router;
