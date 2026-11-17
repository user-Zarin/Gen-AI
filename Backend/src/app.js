const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authrouter = require('./routes/user.route');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authrouter);

module.exports = app;