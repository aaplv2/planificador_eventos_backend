const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { celebrate } = require("celebrate");

const { loginValidator, signUpValidator } = require("./models/validation.js");

const { login, createUser } = require("./controllers/user.js");

const userRoute = require("./routes/user.js");
const eventsRoute = require("./routes/events.js");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

// app.use(cors());

// app.options("*", cors());

const corsOptions = {
  origin: [
    "planificador-eventos-frontend.vercel.app",
    "cluster0.lrfmf.mongodb.net",
  ],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",

  // Enable this if you need to
  // send cookies or HTTP authentication
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.static("/api/images"));

app.get("/", (req, res) => {
  res.send("Hola");
});

app.post("/signin", celebrate({ body: loginValidator }), login);
app.post("/signup", celebrate({ body: signUpValidator }), createUser);

app.use("/users", userRoute);
app.use("/events", eventsRoute);

mongoose.connect(
  "mongodb+srv://aaplv2:Alexkramer101@cluster0.lrfmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(PORT, () => {
  console.log(`App esta detectando el puerto ${PORT}`);
});

module.exports = app;
