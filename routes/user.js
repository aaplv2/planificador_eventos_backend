const router = require("express").Router();
const {
  getUsers,
  getCurrentUser,
  getUser,
  updateUser,
} = require("../controllers/user");

const { celebrate } = require("celebrate");
const { profileUpdateValidator } = require("../models/validation");

// router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:id", getUser);
router.patch("/me", celebrate({ body: profileUpdateValidator }), updateUser);

module.exports = router;
