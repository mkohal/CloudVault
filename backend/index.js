const express = require("express")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const authRouter = require("./routes/authenticationRoutes")
const connectToDB = require("./config/db");
connectToDB();
const cookieParser = require("cookie-parser");
const uploadRouter = require("./routes/uploadRoutes")
const filesRouter = require("./routes/filesDisplayRoutes")
const deleteRouter = require("./routes/deleteRoutes")
const downloadRouter = require("./routes/downloadRoutes")


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", deleteRouter);
app.use("/api", filesRouter);
app.use("/api", authRouter);
app.use("/api", downloadRouter);
app.use("/api/file", uploadRouter);

app.get("/", (req, res) => {
  res.json("Hello");
});

port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})