const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const PORT = process.env.PORT || 5000;
const corsMiddlewaer = require("./middlewaree/cors.middleware");
const app = express();

app.use(corsMiddlewaer);
app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://chvay1996:12arT67PdG09@albiondatabm.dctqnh5.mongodb.net/?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`Сервер запустился на потру ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
