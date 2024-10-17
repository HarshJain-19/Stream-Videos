import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL_LOCAL}/${DB_NAME}`);
        // console.log('Connection Instance: ', connectionInstance);
        console.log(`\nMongoDB connected!! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection Failed!: ", error);
        process.exit(1);
    }
}
export default connectDB; 

