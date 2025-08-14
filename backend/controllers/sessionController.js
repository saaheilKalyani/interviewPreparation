const Session = require('../models/Session');
const Question = require('../models/Question');

// @desc Create a new session
// @route POST /api/sessions/create
// @access Private

exports.createSession = async (req, res) => {
    try {
        const { role, experiance, topicsToFocus, description, questions } = req.body;
        const userId = req.user._id;

        const session = new Session.create({
            user: userId,
            role,
            experiance,
            topicsToFocus,
            description,
        })

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = new Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({ success: true, session});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Get all sessions for the authenticated user
// @route GET /api/sessions/my-sessions
// @access Private

exports.getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate("questions");
        res.status(200).json(sessions );
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Get session by ID
// @route GET /api/sessions/:id
// @access Private

exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: 'questions',
                options: { sort: { isPinned:-1, createdAt: -1 } },
            })
            .exec();
        if (!session) {
            return res
                .status(404)
                .json({ message: 'Session not found' });
        }
        res.status(200).json({success: true, session});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc Delete a session by ID
// @route DELETE /api/sessions/:id
// @access Private

exports.deleteSessions = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Check if the session belongs to the authenticated user
        if (session.user.toString() !== req.user._id) {
            return res.status(401).json({ message: 'Not authorized to delete this session' });
        }

        // First, delete all questions liked to this session
        await Question.deleteMany({ session: session._id });

        // then, delete the session
        await session.deleteOne();
        res.status(200).json({ message: 'Session deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
