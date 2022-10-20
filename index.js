const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./route/users");

const app = express();
dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to mongodb");
  }
);

//middleware --------------
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);

app.listen(5000, () => {
  console.log("Backend server is ready");
});
