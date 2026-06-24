const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db.js');
const { errorHandler } = require('./middleware/errorMiddleware.js');
const cors = require('cors');

const port = process.env.PORT || 5000;

// Connect Database
connectDB();

const app = express();

// CORS
app.use(cors({
    origin: "*"
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Root API route
app.get('/', (req, res) => {
    res.json({ message: 'GoalSetter API is running...' });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`.cyan);
});