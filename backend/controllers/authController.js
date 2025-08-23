const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => { 
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // if (profileImageUrl  == "") {
        //     console.log("profile image not found");
        // }
        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            // profileImageUrl,
        });
        console.log("after defineing");
        // return user data and token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id), // generate JWT token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
    try {
        console.log("in login User");
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // return user data and token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id), // generate JWT token
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// @desc Get user profile
// @route GET /api/auth/profile 
// @access Private (required JWT)
const getUserProfile = async (req, res) => {
    console.log("from getUserProfile");
    try {
        console.log("middleware called");
        const user = await User.findById(req.user._id).select('-password'); // exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) { 
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

module.exports = { registerUser, loginUser, getUserProfile };