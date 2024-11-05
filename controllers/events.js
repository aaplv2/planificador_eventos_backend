const fs = require("fs");
// const multer = require("multer");
// const upload = multer({
//   dest: "/imagenes",
//   storage: multer.memoryStorage(),
// });

//dayjs
const dayjs = require("dayjs");

var customParseFormat = require("dayjs/plugin/customParseFormat");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const Event = require("../models/event");

const {
  NotFoundError,
  BadRequestError,
  AuthneticationError,
} = require("../middlewares/errors");

module.exports.getEvents = (req, res, next) => {
  Event.find({})
    .sort({ date: 1 })
    .limit(5)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send("error");
    });
};

// module.exports.getNextFiveEvents = (req, res, next) => {
//   Event.find({})
//     .sort({ date: 1 })
//     .limit(5)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send("error");
//     });
// };

module.exports.getEventById = (req, res, next) => {
  Event.findById(req.params.id)
    .then((event) => {
      if (event) {
        res.send({ data: event });
      } else {
        throw new NotFoundError("No se encontró ningún evento con ese ID");
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Id de evento no válida"));
      } else {
        next(err);
      }
    });
};

module.exports.postRegisterToEvent = (req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  })
    .then((event) => res.send({ data: event }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Id de evento no válida"));
      } else {
        next(err);
      }
    });
};

module.exports.getEventByDate = (req, res, next) => {
  const date = dayjs
    .utc(decodeURIComponent(req.params.date), "DD/MM/YYYY")
    .startOf("day")
    .toDate();

  const nextDay = dayjs
    .utc(decodeURIComponent(req.params.date), "DD/MM/YYYY")
    .endOf("day")
    .toDate();

  Event.find({
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
};

module.exports.createEvent = (req, res, next) => {
  fs.writeFile(
    `../planificador_eventos_backend/images/${req.file.originalname}`,
    req.file.buffer,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
      }
      Event.create({
        image: req.file.originalname,
        ...req.body,
      })
        .then(() => {
          res.status(201).send({});
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
