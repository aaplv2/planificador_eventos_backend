const router = require("express").Router();
const { getCurrentUser, getUser, updateUser } = require("../controllers/user");

const { celebrate } = require("celebrate");
const { profileUpdateValidator } = require("../models/validation");

router.get("/me", getCurrentUser);
router.get("/:id", getUser);
router.patch("/me", celebrate({ body: profileUpdateValidator }), updateUser);

module.exports = router;
