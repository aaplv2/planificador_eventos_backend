const multer = require("multer");
const upload = multer({
  dest: "/api/imagenes",
  storage: multer.memoryStorage(),
});

const {
  getEventById,
  createEvent,
  getEvents,
  getEventByDate,
  postRegisterToEvent,
  deleteEvent,
  postTaskToEvent,
} = require("../controllers/events");
const auth = require("../middlewares/auth");

const router = require("express").Router();

router.get("/", getEvents);
router.get("/:date/", getEventByDate);
router.get("/date/:id", getEventById);
router.post("/", auth, upload.single("file"), createEvent);
router.patch("/:id/attendees", auth, postRegisterToEvent);
router.patch("/:id/tasks", auth, postTaskToEvent);
router.delete("/date/:id", auth, deleteEvent);

module.exports = router;
