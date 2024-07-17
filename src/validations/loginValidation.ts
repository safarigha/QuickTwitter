import {
  FormDataLoginValidation,
  FormErrorLoginValidation,
} from "../configs/interfaces";

export const validateLogin = (
  formData: FormDataLoginValidation
): FormErrorLoginValidation => {
  const newError: FormErrorLoginValidation = {};

  let hasError = false;

  if (!formData.username) {
    newError.username = "لطفا نام کاربری را وارد کنید";
    hasError = true;
  }

  if (!formData.password) {
    newError.password = "لطفا رمز عبور را وارد کنید";
    hasError = true;
  }

  if (hasError) {
    return newError;
  }

  return newError;
};
