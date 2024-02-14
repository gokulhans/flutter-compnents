const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
require("dotenv").config();

app.use(express.json());

app.use(cors());

const blockRouter = require("./routes/blockRoutes");

app.use("/api/block", blockRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(process.env.PORT || 5000, () =>
  console.log("Server is running on port 5000")
);
