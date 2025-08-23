const Session = require('../models/Session');
const Question = require('../models/Question');

// @desc Create a new session
// @route POST /api/sessions/create
// @access Private
exports.createSession = async (req, res) => {
    try {
        console.log("🔍 CREATE SESSION CALLED");
        console.log("🔍 Request body:", req.body);
        console.log("🔍 User ID:", req.user._id);

        const { role, experiance, topicsToFocus, description, questions } = req.body;
        const userId = req.user._id;

        // Step 1: Validate required fields
        if (!role || !experiance || !topicsToFocus || !description) {
            return res.status(400).json({ 
                message: 'Missing required fields: role, experiance, topicsToFocus, description' 
            });
        }

        console.log("🔍 Creating session...");

        // Step 2: Create session without questions first
        const sessionData = {
            user: userId,
            role,
            experiance,
            topicsToFocus,
            description,
        };

        console.log("🔍 Session data:", sessionData);

        const session = await Session.create(sessionData);
        console.log("🔍 Session created:", session);

        // Step 3: Create questions if provided
        let questionIds = [];
        if (questions && Array.isArray(questions) && questions.length > 0) {
            console.log("🔍 Creating questions...");
            
            for (let i = 0; i < questions.length; i++) {
                const q = questions[i];
                console.log(`🔍 Creating question ${i + 1}:`, q);
                
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                
                console.log(`🔍 Question ${i + 1} created:`, question._id);
                questionIds.push(question._id);
            }
            
            // Step 4: Update session with question IDs
            session.questions = questionIds;
            await session.save();
            console.log("🔍 Session updated with questions");
        }

        console.log("🔍 Success - sending response");
        res.status(201).json({ success: true, session });

    } catch (error) {
        console.error('❌ CREATE SESSION ERROR:', error);
        console.error('❌ Error stack:', error.stack);
        res.status(500).json({ 
            message: 'Server error in createSession', 
            error: error.message,
            stack: error.stack
        });
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
        if (session.user.toString() !== req.user._id.toString()) {
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
