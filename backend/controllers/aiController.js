const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompts} = require("../utils/prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc Generate an interview question using Gemini
// @route POST /api/ai/generate-question
// @access Private

const generateInterviewQuestion = async (req, res) => {
    try {
        const { role, experiance, topicsToFocus, numberOfQuestions } = req.body;
        console.log(req.body);
        if (!role || !experiance || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }
        const prompt = questionAnswerPrompts(role, experiance, topicsToFocus, numberOfQuestions);

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-lite',
            contents : prompt,
        });

        let rawText = response.text;

        // clean it: Remove ``` json and ``` from the start and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // Remove ``` json at the start
            .replace(/```$/, "") // Remove ``` at the end
            .trim(); // remove extra spaces

        const data = JSON.parse(cleanedText);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate quesions', error: error.message });
    }
};

// @desc Generate a concept explanation using Gemini
// @route POST /api/ai/generate-explanation
// @access Private

const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: 'Please provide a question.' });
        }

        const prompt = conceptExplainPrompt(question);

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-lite',
            contents : prompt,
        });

        let rawText = response.text;

        // clean it: Remove ``` json and ``` from the start and end
        const cleanedText = rawText
            .replace(/^```json\s*/, "") // Remove ``` json at the start
            .replace(/```$/, "") // Remove ``` at the end
            .trim(); // remove extra spaces

        const data = JSON.parse(cleanedText);
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ message: 'Failed to generate quesions', error: error.message });
    }
};

module.exports = { generateInterviewQuestion, generateConceptExplanation };