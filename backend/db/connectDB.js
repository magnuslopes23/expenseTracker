require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbUrl = process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL;
        console.log(dbUrl);
        const connectionInstance = await mongoose.connect(dbUrl);
        console.log(`\n MongoDB connected!!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGO connection error:', error);
        process.exit(1);
    }
};

module.exports = {connectDB};