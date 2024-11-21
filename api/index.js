const express = require("express");
const mongoose = require("mongoose");
// const { celebrate, Segments } = require("celebrate");
var bodyParser = require("body-parser");

// const { createRouteHandler } = require("uploadthing/express");
// const uploadRouter = require("./utils/uploadthing.js");

// var ImageKit = require("imagekit");

// const imagekit = new ImageKit({
//   publicKey: "public_Q9cU9hXZkVVhRHA2aqKAEVmnayU=",
//   privateKey: "private_+MdVvyHq0DS4V72jmRvhE9ut51o=",
//   urlEndpoint: "https://ik.imagekit.io/75cchptl5",
// });

const { loginValidator, signUpValidator } = require("./models/validation.js");

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
      "https://planificador-eventos-frontend.vercel.app",
      "planificador-eventos-frontend.vercel.app",
      "cluster0.lrfmf.mongodb.net",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use(
//   "/api/uploadthing",
//   createRouteHandler({
//     router: uploadRouter,
//     config: {
//       token: process.env.UPLOADTHING_TOKEN,
//     },
//   })
// );

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hola");
});

app.post(
  "/signin",
  // celebrate({ body: loginValidator }),
  login
);
app.post(
  "/signup",
  // celebrate({ body: signUpValidator }),
  createUser
);

app.use("/users", userRoute);
app.use("/events", eventsRoute);

mongoose.connect(
  "mongodb+srv://aaplv2:Alexkramer101@cluster0.lrfmf.mongodb.net/event_planner?retryWrites=true&w=majority&appName=Cluster0"
);

app.listen(PORT, () => {
  console.log(`App esta detectando el puerto ${PORT}`);
});

module.exports = app;
