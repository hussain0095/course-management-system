const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to Database");
});

mongoose.connection.on("error", (err) => {
  console.log("DB Connection Error:", err);
});

app.use("/instructors", require("./routes/instructors"));
app.use("/courses", require("./routes/courses"));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
