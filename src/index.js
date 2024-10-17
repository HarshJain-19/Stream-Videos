//^ require method
// require('dotenv').config({path: './env});
// console.log(process.env);


//^ import 'dotenv/config';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import app from './app.js';

dotenv.config({ path: './env' });
const port = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.on("error", error => {
      console.error("server failed:", err);
      throw error;
    });
    app.listen(port, () => {
      console.log("server is running at port:", port);
    })
  }).catch(error => console.error("server is paused due to error:", error));






  







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
      console.error("Error: ", error);
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

