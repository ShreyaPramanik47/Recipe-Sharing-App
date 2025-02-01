// Import required modules
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const favRoutes = require('./routes/favRoutes');

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/fav', favRoutes);

// Database connection
const connectDB = require("./db");
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// console.log('JWT_SECRET:', process.env.JWT_SECRET);
