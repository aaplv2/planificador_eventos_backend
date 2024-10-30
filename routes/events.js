const { getEventById, createEvent } = require("../controllers/events");

const router = require("express").Router();

router.get("/", createEvent);
router.get("/date/:id", getEventById);

module.exports = router;
