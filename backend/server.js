require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware to handle cors
app.use(
    cors({
        origin: "*", 
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

connectDB();

// middleware 
app.use(express.json());

// routes 
app.use("/api/auth", authRoutes);
// app.use("/api/sessions", sesstionRoutes);
// app.use("/api/questions", questionRoutes);

// app.use("/api/ai/generate-question", protect, generateInterviewQuestion);
// app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);

// serve uploades folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});