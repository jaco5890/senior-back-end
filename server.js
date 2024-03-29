require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    express.json({
      limit: process.env.NODE_BODY_LIMIT,
    })
  );

//cors
app.use(cors());

//use routes
require("./api/routes")(app);

//request to see if the endpoint works
app.get("/", (req, res) => {
    return res.send(process.env.API_WORKS_MESSAGE);
});

// request to handle undefined or all other routes
app.get("*", (req, res) => {
    res.send(process.env.API_WORKS_MESSAGE);
});

app.use((req, res) => {
    res.status(404).send("<h2 align=center>Page Not Found!</h2>");
});

//Database connection to hosted db
//require("./config/db");

//Database connection for local instance
require("./config/db_local");

//port settings
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server has started"));

module.exports = app;
