const express = require("express")
const path = require("path")
const PORT = process.env.PORT || 3001
const app = express()
const cors = require("cors")
const bookRoutes = require("./routes/books.route")
const mongoose = require("mongoose")
require("dotenv").config()

// CORS
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// Define middleware here
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}

// Define API routes here
// Book Routes
app.use("/api/books", bookRoutes)

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

// connect to mongo db
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(PORT)
    console.log(`🌎 ==> API server now on port ${PORT}!`)
  })
  .catch((err) => console.log(err))
