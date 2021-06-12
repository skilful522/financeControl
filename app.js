const path = require("path");
const https = require("https");

const APP_HEROKU_URL = 'https://mymealscontrol.herokuapp.com/';

const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/privateProduct", require("./routes/privateProduct.routes"));
app.use("/api/products", require("./routes/products.routes"));

const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, "./front/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./front/build", "index.html"));
});

async function start() {
  try {
    await mongoose.connect("mongodb+srv://Stanislav:boneslilpeep@cluster0.ea09v.mongodb.net/app?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log("app has been started", PORT);
      setInterval(() => {
        https.get(APP_HEROKU_URL, (value => console.log(value, 'hhhh')));
      }, 1500000);
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();
