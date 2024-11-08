require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}`);
        console.log(`\n MongoDB connected!!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGO connection error:', error);
        process.exit(1);
    }
};

module.exports = {connectDB};