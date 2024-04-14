//^ require method
// require('dotenv').config({path: './env});
// console.log(process.env);


//^ import 'dotenv/config';
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({path: './env'});

connectDB();













//^ in this approach db file data can be written in index.js file
/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants';
import express from 'express';
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        //* Listeners for express app
        app.on('error', (error) => {
            console.error("Error: ",error);
            throw error;
        });
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port: ${process.env.PORT}`)
        });
    } catch (error) {
        console.error("Your Error on index page: ", error);
    }
})();
*/

