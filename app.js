const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./connection/conn"); // Import the MongoDB connection setup

const Submission = require("./routes/submission");

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", Submission);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
