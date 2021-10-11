import Joi from "joi"

const usernameRegExp = /^[a-zA-Z0-9]{3,30}$/
const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/

const signUpSchema = Joi.object({
  username: Joi.string().regex(usernameRegExp),
  email: Joi.string().regex(emailRegExp).required(),
  password: Joi.string().min(4).required(),
  confirmPassword: Joi.string(),
})

export default signUpSchema
