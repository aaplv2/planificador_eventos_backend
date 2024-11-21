const { Joi } = require("celebrate");

const loginValidator = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});
const signUpValidator = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8),
});

const profileUpdateValidator = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
});

module.exports = {
  loginValidator,
  signUpValidator,
  profileUpdateValidator,
};
