import express from 'express';
import { connectDB } from './config/dbConnection.js';
import dotenv from 'dotenv';

import apiRoutes from './routes/api/index.js';
import path from 'path';

dotenv.config();

// Initialize the Express application
const app = express();

// define the port
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// api routes
app.use('/api', apiRoutes);

// Serve static files from the React app
const __dirname = path.resolve(); // Get the current directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Catch-all route to serve the React app for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Connect to the database and start the server
app.listen(PORT, () => {
    connectDB()
        .then(() => {
            console.log(`Server is running on port ${PORT}`.green.bold);
        })
        .catch((error) => {
            console.error(`Error connecting to the database: ${error.message}`.red);
            process.exit(1); // Exit the process with failure
        });
});