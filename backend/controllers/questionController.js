const Question = require('../models/Question');
const Session = require('../models/Session');

// @desc Add additional question to an existing session
// @route POST /api/questions/add
// @access Private
exports.addQuestionToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // create new questions and add them to the session
        const createdQuestions = await Question.insertMany(
            questions.map(q => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,
                
            }))
        );

        // update session with new question IDs
        session.questions.push(...createdQuestions.map(q => q._id));
        await session.save();

        res.status(201).json(createdQuestions);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

//@desc Toggle pin status of a question
//@route POST /api/questions/:id/pin
//@access Private

exports.togglePinQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);

        if (!question) {
            return res.status(404).json({ success:false, message: 'Question not found' });
        }

        question.inPinned = !question.inPinned;
        await question.save();

        res.status(200).json({ success: true, question });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Update notes for a question
// @route POST /api/questions/:id/note
// @access Private

exports.updateQuestionNotes = async (req, res) => {
    try {
        const {note} = req.body;
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }
        question.note = note || "";
        await question.save();
        res.status(200).json({ success: true, question });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
    