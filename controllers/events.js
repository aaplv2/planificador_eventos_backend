const multer = require("multer");
const fs = require("fs");

const upload = multer({
  dest: "/imagenes",
  storage: multer.memoryStorage(),
});

const Event = require("../models/event");

const {
  NotFoundError,
  BadRequestError,
  AuthneticationError,
} = require("../middlewares/errors");

module.exports.getEventById = (req, res, next) => {
  Event.findById(req.params.id)
    .then((event) => {
      if (event) {
        res.send({ data: event });
      } else {
        throw new NotFoundError("No se encontró ningún usuario con ese ID");
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Id de usuario no válida"));
      } else {
        next(err);
      }
    });
};

module.exports.createEvent = (req, res, next) => {
  console.log(req.file)
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
          ...req.body,
        })
        .then(() => {
          res.status(201).send("Ok");
        })
        .catch((err) => {
          if (err.name === "CastError") {
            next(new BadRequestError("Id de evento no válida"));
          } else {
            next(err);
          }
        });
    }
  );
};
