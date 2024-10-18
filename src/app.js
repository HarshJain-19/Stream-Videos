import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  credentials: true,
};

//* default middlewares
app.use(cors(corsOptions));           //~ allowing cross origin resource sharing
app.use(express.json({limit: "16kb"}));   //~ allowing json data with limit of 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"}));  //~ allowing url encoding
app.use(express.static("public"));  //~ to store files, pdf and more in public folder at server
app.use(cookieParser());    //~ parsing cookie with securely

//* import routers 
import userRouter from "./routes/user.routes.js";

app.all("/", (req, res) => {
  res.send("Namaste EveryOne!");
});
//* router declaration
app.use("/api/v1/user", userRouter);



//* global error routes handle
app.route("*").all((req, res) => {
  res.status(404).send("Sorry, this route is not defined.");
});

export default app;





