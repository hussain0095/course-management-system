const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.use(express.urlencoded({ extended: false }))
app.set("view engine", "ejs")

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to Database")
  } catch (err) {
    console.log("DB Connection Error:", err)
  }
}
connectToDB()

app.get("/", (req, res) => {
  res.send("HOME WORKS");
});

app.use("/instructors", require("./routes/instructors"))
app.use("/courses", require("./routes/courses"))

app.listen(3000, () => console.log("Server running on port 3000"))
