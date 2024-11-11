const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { celebrate } = require("celebrate");

const { loginValidator, signUpValidator } = require("./models/validation.js");

const { login, createUser } = require("./controllers/user.js");

const auth = require("./middlewares/auth.js");

const userRoute = require("./routes/user.js");
const eventsRoute = require("./routes/events.js");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use(cors({ origin: true }));

app.options("*", cors({ origin: true }));

app.use(express.static("images"));

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.post("/signin", celebrate({ body: loginValidator }), login);
app.post("/signup", celebrate({ body: signUpValidator }), createUser);

// app.use(auth);

app.use("/users", userRoute);
app.use("/events", eventsRoute);

mongoose.connect("mongodb://localhost:27017/event_planner");

app.listen(PORT, () => {
  console.log(`App esta detectando el puerto ${PORT}`);
});
