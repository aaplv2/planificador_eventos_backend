const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  getUser,
  updateUser,
} = require("../controllers/user");

const { celebrate } = require("celebrate");
const { profileUpdateValidator } = require("../models/validation");
const auth = require("../middlewares/auth");

// router.get("/", getUsers);
router.get("/me", auth, getCurrentUser);
router.get("/:id", auth, getUser);
router.patch("/me", celebrate({ body: profileUpdateValidator }), updateUser);

module.exports = router;
