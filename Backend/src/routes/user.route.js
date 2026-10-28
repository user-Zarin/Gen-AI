const express = require('express');
const authRouter = express.Router();
const authUser = require("../middleware/auth.middleware");
const { registerUser, loginUser, logoutUser,getMeController } = require('../controllers/user.controller');

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.get('/logout',logoutUser); 
authRouter.get('/get-me',authUser,getMeController);
module.exports = authRouter;