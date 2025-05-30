import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red);
        process.exit(1); // Exit the process with failure
    }
}