import Joi from "joi"

const usernameRegExp = /^[0-9a-z+]{3,}/
const passwordRegExp = /^[0-9a-z]{4,}/

const signUpSchema = Joi.object({
  username: Joi.string().regex(usernameRegExp).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(passwordRegExp).required(),
  confirmPassword: Joi.string().required(),
})

export default signUpSchema
