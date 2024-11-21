const router = require("express").Router();
const { getCurrentUser, getUser, updateUser } = require("../controllers/user");

const auth = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.get("/:id", auth, getUser);
router.patch(
  "/me",
  auth,
  updateUser
);

module.exports = router;
