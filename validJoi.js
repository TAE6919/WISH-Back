import signUpSchema from './validations/signup.js';
import { logger } from './logger/logger.js';
export const isSignUp = async (signUpForm) => {
  try {
    await signUpSchema.validateAsync(signUpForm);
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
