const dayjs = require("dayjs");

var customParseFormat = require("dayjs/plugin/customParseFormat");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
var randomstring = require("randomstring");

var ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_Q9cU9hXZkVVhRHA2aqKAEVmnayU=",
  privateKey: "private_+MdVvyHq0DS4V72jmRvhE9ut51o=",
  urlEndpoint: "https://ik.imagekit.io/75cchptl5",
});

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const Event = require("../models/event");

const { NotFoundError, BadRequestError } = require("../middlewares/errors");

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
  const attendeeTicket = randomstring.generate(5);
  const attendees = req.body.attendees;
  const lastAttendee = attendees[attendees.length - 1];
  lastAttendee.attendeeTicket = attendeeTicket;
  const newAttendees = attendees.splice(attendees.length - 1, 1, lastAttendee);
  Event.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { attendees: lastAttendee } },
    {
      returnDocument: "after",
    }
  )
    .then((event) => res.send({ data: event }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Id de evento no válida"));
      } else {
        next(err);
      }
    });
};

module.exports.postTaskToEvent = (req, res, next) => {
  const tasks = req.body.tasks;
  const lastTasks = tasks[tasks.length - 1];
  Event.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { tasks: lastTasks } },
    {
      returnDocument: "after",
    }
  )
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
    .orFail(() => {
      throw new Error("No se encontró ningún evento con esa fecha");
    })
    .sort({ time: -1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("erro de solicitud");
      res.status(400).send({});
    });
};

module.exports.createEvent = (req, res, next) => {
  imagekit
    .upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    })
    .then((data) => {
      Event.create({
        image: data.url,
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
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports.deleteEvent = (req, res, next) => {
  Event.findByIdAndDelete(req.params.id)
    .orFail(() => {
      throw new NotFoundError("No se ha encontrado ningun evento con ese id");
    })
    .then((event) => res.send(event))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Datos de evento no validos"));
      } else {
        next(err);
      }
    });
};
