import express from 'express';
import { connectDB } from './config/dbConnection.js';
import dotenv from 'dotenv';
import { logMethod } from './middleware/logMethod.middleware.js';

//import { apiRoutes } from './routes/api/index.js';
import path from 'path';

dotenv.config();

// Initialize the Express application
const app = express();

// define the port
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', logMethod); // Log method middleware

// api routes
//app.use('/api', apiRoutes);

// Serve static files from the React app
const __dirname = path.resolve(); // Get the current directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Catch-all route to serve the React app for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Connect to the database and start the server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
};

startServer();