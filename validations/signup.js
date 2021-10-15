import Joi from "joi";

const usernameRegExp = /^[0-9a-z+]{3,}/;
const passwordRegExp = /^[0-9a-z]{4,}/;

const signUpSchema = Joi.object({
  nick: Joi.string().regex(usernameRegExp).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().regex(passwordRegExp).required(),
  confirmPassword: Joi.string().regex(passwordRegExp).required(),
});

export default signUpSchema;
