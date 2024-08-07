import {
  FormDataSignupValidation,
  FormErrorSignupValidation,
} from "../configs/interfaces";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

export const validateStepOne = (
  formData: FormDataSignupValidation
): FormErrorSignupValidation => {
  const newError: FormErrorSignupValidation = {};

  if (!formData.email) {
    newError.email = "لطفا ایمیل را وارد کنید";
  }
  if (!formData.password) {
    newError.password = "لطفا رمز عبور را وارد کنید";
    newError.confirmPassword = "لطفا رمز عبور را وارد کنید";
  }

  if (!passwordRegex.test(formData.password)) {
    newError.password =
      "رمز عبور باید شامل حروف بزرگ و کوچک، عدد و یکی از علائم @$!%*?& باشد و 8 کاراکتر داشته باشد";
    newError.confirmPassword =
      "رمز عبور باید شامل حروف بزرگ و کوچک، عدد و یکی از علائم @$!%*?& باشد و 8 کاراکتر داشته باشد";
  }

  if (formData.password !== formData.confirmPassword) {
    newError.confirmPassword = "رمز عبور وارد شده یکسان نمی باشد";
  }
  return newError;
};

export const validateStepTwo = (
  formData: FormDataSignupValidation
): FormErrorSignupValidation => {
  const newError: FormErrorSignupValidation = {};

  if (!formData.username) {
    newError.username = "لطفا نام کاربری را وارد کنید";
  }
  return newError;
};
