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
  getNextFiveEvents,
} = require("../controllers/events");

const router = require("express").Router();

router.get("/", getEvents);
// router.get("/", getNextFiveEvents);
router.get("/:date/", getEventByDate);
router.get("/date/:id", getEventById);
router.post("/", upload.single("file"), createEvent);

module.exports = router;
