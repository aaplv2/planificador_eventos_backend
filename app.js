const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const upload = multer({
  dest: "/imagenes",
  storage: multer.memoryStorage(),
});
const mongoose = require("mongoose");
const event = require("./models/event");

const app = express();

app.use(cors());
// app.use(express.json());

app.use(express.static("images"));

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.post("/upload", upload.single("file"), (req, res) => {
  fs.writeFile(
    `../planificador_eventos_backend/images/${req.file.originalname}`,
    req.file.buffer,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      }

      // const date = new Date(req.body.date);

      event
        .create({
          image: req.file.originalname,
          // title: req.body.title,
          ...req.body,
          // date
        })
        .then(() => {
          res.status(201).send("Ok");
        })
        .catch((err) => {
          res.send("error");
          console.log(err);
        });
    }
  );
});

app.get("/events", (req, res) => {
  event
    .find({})
    .sort({ date: -1 })
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
  const date = new Date(req.params.date);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - 1);
  console.log(date)
  // event
  //   .find({ date: date })
  //   .sort({ time: -1 })
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.send("error");
  //   });
});

mongoose.connect("mongodb://localhost:27017/event_planner");

app.listen(3000);
