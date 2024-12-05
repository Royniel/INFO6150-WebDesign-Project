const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

const router = express.Router();

// Route for user and admin registration
router.post('/register', async (req, res) => {
    const { name, surname, email, password, role } = req.body;

     // Validating required fields
    if (!name || !surname || !email || !password || (!email.endsWith('@wwadmin.com') && !role)) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        // Checking if the email is already registered as a user or admin
        let user = await User.findOne({ email });
        let admin = await Admin.findOne({ email });

        if (user || admin) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Handling admin registration if the email ends with '@wwadmin.com'
        if (email.endsWith('@wwadmin.com')) {
            const newAdmin = new Admin({ name, surname, email, password });

            // Hashing the password before saving
            const salt = await bcrypt.genSalt(10);
            newAdmin.password = await bcrypt.hash(password, salt);

            await newAdmin.save();

            return res.json({ user: newAdmin, message: 'Admin registered successfully', redirect: '/admin/home' });
        }

        // Handling regular user registration
        user = new User({ name, surname, email, password, role });

        // Hashing the password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Generating a JWT token for the registered user
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ user, token, redirect: '/home' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// Route for user and admin login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validating required fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        let user = await User.findOne({ email });
        let admin = await Admin.findOne({ email });

        if (admin) {
            // Comparing the hashed password with the input password for admin
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generating a JWT token for the logged in admin
            const payload = { user: { id: admin.id } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ user: admin, token, redirect: '/admin/home' });
        }

        if (user) {
            // Comparing the hashed password with the input password for user
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generating a JWT token for the logged in user
            const payload = { user: { id: user.id } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ user, token, redirect: '/home' });
        }

        // Returning an error message if the user or admin is not found
        return res.status(400).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;