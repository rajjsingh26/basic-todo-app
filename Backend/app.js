const express = require('express');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors')

// cookies and file upload middlware
app.use(cookieParser())

//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// morgan middleware
// app.use(morgan("tiny"));

// import all routes here 
const user = require('./routes/user.route.js')
const task = require('./routes/task.route.js')

// router middleware
app.use('/api/v1', user)
app.use('/api/v1', task)

// export app js
module.exports = app;