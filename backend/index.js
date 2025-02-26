const express = require("express")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors")
const authRouter = require("./routes/authenticationRoutes")
const connectToDB = require("./config/db");
connectToDB();
const cookieParser = require("cookie-parser");
const uploadRouter = require("./routes/uploadRoutes")
const filesRouter = require("./routes/filesDisplayRoutes")
const deleteRouter = require("./routes/deleteRoutes")
const downloadRouter = require("./routes/downloadRoutes")

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL, // Update this in `.env` to your frontend URL after deployment
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", deleteRouter);
app.use("/", filesRouter);
app.use("/", authRouter);
app.use("/", downloadRouter);
app.use("/file", uploadRouter);

port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})