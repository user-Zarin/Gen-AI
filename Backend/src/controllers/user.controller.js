const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const blacklistTokenModel = require('../models/blacklist.model');

/**
 * 
 * @name registerUser
 * @description This function is used to register a new user.
 * @access public
 */

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ username, email, password: hash });
    const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie("token", token);
    res.status(201).json({
        id: newUser._id, username: newUser.username, email: newUser.email,
        message: 'User registered successfully', token
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie("token", token);
    res.status(200).json({
        id: user._id, username: user.username, email: user.email,
        message: 'User logged in successfully', token
    });
}

async function logoutUser(req, res) {
    try {
        const token = req.cookies?.token;
        console.log(token)
        if (token) {
            // Add the token to the blacklist
            await blacklistTokenModel.create({ token });
        }

        res.clearCookie("token");

        return res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            message: "Failed to log out",
        });
    }
}

async function getMeController(req,res){
    const user = await userModel.findById(req.user.id);
    res.status(200).json({
        user:{
            id:user._id,
            username: user.username,
            email:user.email
        }
    })  
}

module.exports = { registerUser, loginUser, logoutUser, getMeController };