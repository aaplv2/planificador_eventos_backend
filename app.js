const express = require("express");
const multer = require("multer");
const fs = require("fs");
const upload = multer({
  dest: "/imagenes",
  storage: multer.memoryStorage(),
});
const mongoose = require("mongoose");
const event = require("./models/event");

const app = express();

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  fs.writeFile(
    `../planificador_eventos_frontend/src/images/${req.file.originalname}`,
    req.file.buffer,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      }
      event
        .create({ image: req.file.originalname })
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

mongoose.connect("mongodb://localhost:27017/event_planner");

app.listen(3000);
