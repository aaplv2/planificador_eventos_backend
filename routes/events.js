const multer = require("multer");
const upload = multer({
  dest: "/imagenes",
  storage: multer.memoryStorage(),
});

const {
  getEventById,
  createEvent,
  getEvents,
  getEventByDate,
  postRegisterToEvent,
} = require("../controllers/events");

const router = require("express").Router();

router.get("/", getEvents);
// router.get("/nextFiveEvents", getNextFiveEvents);
router.get("/:date/", getEventByDate);
router.get("/date/:id", getEventById);
router.post("/", upload.single("file"), createEvent);
router.patch("/:id", postRegisterToEvent);

module.exports = router;
