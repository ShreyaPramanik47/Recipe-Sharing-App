const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken, jwtAuthMiddleware } = require('../jwt');

const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        // Create new user
        const user = new User({ name, email, password });
        await user.save();

        // Generate JWT token
        const token = generateToken({ id: user._id, email: user.email });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Login
router.post('/login', async (req, res) => {
try {
    const { email, password } = req.body;
    console.log('Login Attempt:', email, password);

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'User not found' });

    console.log('Stored Hash:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match:', isMatch);

    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({ id: user._id });
    res.json({ token });

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
});

// Get current user (Protected Route)
router.get('/me', jwtAuthMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
