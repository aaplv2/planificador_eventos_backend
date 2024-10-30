const {
  getEventById,
  createEvent,
  getEvents,
  getEventByDate,
} = require("../controllers/events");

const router = require("express").Router();

router.get("/", getEvents);
router.get("/:date/", getEventByDate);
router.get("/date/:id", getEventById);
router.post("/", createEvent);

module.exports = router;
