const path = require("path");
require("dotenv").config();
const itnRoute = require("./routes/itn.ts");
const concreteRoute = require("./routes/concrete.ts");
const reinforcementRoute = require("./routes/reinforcement.ts");
const qorNcrRoute = require("./routes/qorncr.ts");
const userRoute = require("./routes/user.ts");
const labRoute = require("./routes/lab.ts");
const itpRoute = require("./routes/itp.ts");

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!!"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/itn", itnRoute);
app.use("/api/concrete", concreteRoute);
app.use("/api/reinforcement", reinforcementRoute);
app.use("/api/qorncr", qorNcrRoute);
app.use("/api/user", userRoute);
app.use("/api/lab", labRoute);
app.use("/api/itp", itpRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
