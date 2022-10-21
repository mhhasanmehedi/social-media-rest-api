const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./route/users");
const authRoute = require("./route/auth");

const app = express();
dotenv.config();

//----------------- mongoose connection -----------------
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

//----------------- middleware --------------
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//----------------- routes --------------
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

//----------------- app listen -----------------
app.listen(5000, () => {
  console.log("Backend server is ready");
});
