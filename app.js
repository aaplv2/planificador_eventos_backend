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
      event
        .create({
          image: req.file.originalname,
          // title: req.body.title,
          ...req.body,
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
    .sort({ createdAt: -1 })
    .limit(5)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send("error");
    });
});

mongoose.connect("mongodb://localhost:27017/event_planner");

app.listen(3000);
