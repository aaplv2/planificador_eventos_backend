const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { celebrate } = require("celebrate");
// const multer = require("multer");
// const fs = require("fs");

var customParseFormat = require("dayjs/plugin/customParseFormat");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");

// const upload = multer({
//   dest: "/imagenes",
//   storage: multer.memoryStorage(),
// });

const event = require("./models/event.js");
const { loginValidator, signUpValidator } = require("./models/validation.js");

const { login, createUser } = require("./controllers/user.js");

const auth = require("./middlewares/auth.js");

const userRoute = require("./routes/user.js");
const eventRoute = require("./routes/events.js");

const { formatDate } = require("./utils/formatDate.js");
const dayjs = require("dayjs");

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

app.use(cors({ origin: true }));

app.options("*", cors({ origin: true }));

// mongoose.connect("mongodb://localhost:27017/");

app.use(express.static("images"));

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.post("/signin", celebrate({ body: loginValidator }), login);
app.post("/signup", celebrate({ body: signUpValidator }), createUser);

app.use(auth);

app.use("/user", userRoute);
app.use("/events", eventRoute);

// app.post("/upload", upload.single("file"), (req, res) => {
//   fs.writeFile(
//     `../planificador_eventos_backend/images/${req.file.originalname}`,
//     req.file.buffer,
//     (err) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Error");
//       }

//       event
//         .create({
//           image: req.file.originalname,
//           ...req.body,
//         })
//         .then(() => {
//           res.status(201).send("Ok");
//         })
//         .catch((err) => {
//           res.send("error");
//           console.log(err);
//         });
//     }
//   );
// });

app.get("/events", (req, res) => {
  event
    .find({})
    .sort({ date: 1 })
    .limit(5)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send("error");
    });
});

app.get("/events/:date", (req, res) => {
  const date = dayjs
    .utc(decodeURIComponent(req.params.date), "DD/MM/YYYY")
    .startOf("day")
    .toDate();

  const nextDay = dayjs
    .utc(decodeURIComponent(req.params.date), "DD/MM/YYYY")
    .endOf("day")
    .toDate();

  event
    .find({
      date: {
        $gte: date,
        $lt: nextDay,
      },
    })
    .sort({ time: -1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send("error");
    });
});

mongoose.connect("mongodb://localhost:27017/event_planner");

app.listen(PORT, () => {
  console.log(`App esta detectando el puerto ${PORT}`);
});
