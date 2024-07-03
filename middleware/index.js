const express = require("express");
const app = express(); // initialize express

app.use(express.json());

// Logging middleware
const logger = (req, res, next) => {
  console.log(`Request METHOD: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Time: ${new Date()}`);
  next();
}

app.use(logger);

app.get("/", (req, res) => {
  console.log("2");
  res.status(200).send("Hello World");
});



const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
