require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDB, getDBStatus } = require("./config/db"); 
connectToDB();


const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const authRouter = require("./routes/authenticationRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const filesRouter = require("./routes/filesDisplayRoutes");
const deleteRouter = require("./routes/deleteRoutes");
const downloadRouter = require("./routes/downloadRoutes");


app.use("/api", deleteRouter);
app.use("/api", filesRouter);
app.use("/api", authRouter);
app.use("/api", downloadRouter);
app.use("/api/file", uploadRouter);




app.get("/", (req, res) => {
  res.json({
    message: "Hello, your backend is running!",
    databaseStatus: getDBStatus(),
  });
});

app.get("/debug", (req, res) => {
  res.json({
    MONGO_URI: process.env.MONGO_URI ? "Loaded" : "Not Loaded",
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
