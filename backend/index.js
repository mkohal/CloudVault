// 1️⃣ Load environment variables before anything else
require("dotenv").config();

// 2️⃣ Import dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// 3️⃣ Initialize the app
const app = express();
app.use(
  cors({
    origin: "https://cloud-vault-frontend-omega.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 5️⃣ Middlewares before defining routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 6️⃣ Import routes
const authRouter = require("./routes/authenticationRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const filesRouter = require("./routes/filesDisplayRoutes");
const deleteRouter = require("./routes/deleteRoutes");
const downloadRouter = require("./routes/downloadRoutes");

// 7️⃣ Define routes AFTER middlewares
app.use("/api", deleteRouter);
app.use("/api", filesRouter);
app.use("/api", authRouter);
app.use("/api", downloadRouter);
app.use("/api/file", uploadRouter);

// 8️⃣ Root route
app.get("/", (req, res) => {
  res.json("Hello your backend is running");
});

// 9️⃣ Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
