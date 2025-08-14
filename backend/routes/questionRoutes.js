const express = require('express');
const { togglePinQuestion, updateQuestionNotes, addQuestionToSession } = require('../controllers/questionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', protect, addQuestionToSession); // Add a question to a session
router.post('/:id/pin', protect, togglePinQuestion); 
router.post('/:id/note', protect, updateQuestionNotes); // Update question notes

module.exports = router;