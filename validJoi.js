import signUpSchema from "./validations/signup.js";

export const isSignUp = async (signUpForm) => {
  try {
    await signUpSchema.validateAsync(signUpForm);
    return true;
  } catch (error) {
    return false;
  }
};
