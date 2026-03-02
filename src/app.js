const express = require("express");

const app = express();

app.use(express.json());

app.use(
  require("./routes/identifyRoute")
);

app.listen(3000);