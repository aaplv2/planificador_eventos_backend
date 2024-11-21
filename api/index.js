const express = require("express");
const mongoose = require("mongoose");

const { login, createUser } = require("./controllers/user.js");

const userRoute = require("./routes/user.js");
const eventsRoute = require("./routes/events.js");

const { PORT = 3000 } = process.env;
const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://planificador-eventos-frontend.vercel.app",
      "planificador-eventos-frontend.vercel.app",
      "cluster0.lrfmf.mongodb.net",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(express.static("public"));

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/users", userRoute);
app.use("/events", eventsRoute);

mongoose.connect(
  "mongodb+srv://aaplv2:Alexkramer101@cluster0.lrfmf.mongodb.net/event_planner?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(PORT, () => {
  console.log(`App esta detectando el puerto ${PORT}`);
});

module.exports = app;
