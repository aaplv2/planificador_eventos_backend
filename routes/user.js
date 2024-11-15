const router = require("express").Router();
const { getCurrentUser, getUser, updateUser } = require("../controllers/user");

const { celebrate } = require("celebrate");
const { profileUpdateValidator } = require("../models/validation");
const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.get("/:id", auth, getUser);
router.patch(
  "/me",
  auth,
  celebrate({ body: profileUpdateValidator }),
  updateUser
);

module.exports = router;
