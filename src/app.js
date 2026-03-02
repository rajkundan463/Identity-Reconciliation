require("dotenv").config();
const express = require("express");
const cors = require("cors");

const identifyRoute = require("./routes/identifyRoute");
const contactRoute = require("./routes/contactRoute");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", identifyRoute);
app.use("/api", contactRoute);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});