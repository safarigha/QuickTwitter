export type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  bio: string;
};

export type FormError = Partial<FormData>;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;

export const validateStepOne = (formData: FormData): FormError => {
  const newError: FormError = {};

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

export const validateStepTwo = (formData: FormData): FormError => {
  const newError: FormError = {};

  if (!formData.username) {
    newError.username = "لطفا نام کاربری را وارد کنید";
  }
  return newError;
};

// import * as yup from "yup";

// export const signUpSchema = yup.object({
//   username: yup.string().required("نام کاربری حتما باید وارد شود"),
//   email: yup
//     .string()
//     .email("ایمیل وارد شده معتبر نیست")
//     .required("شما حتما باید ایمیل خود را وارد کنید"),
//   password: yup.string().required("شما حتما باید رمز عبور را وارد کنید"),
//   vpassword: yup
//     .string()
//     .oneOf([yup.ref("password")], "تکرار رمز عبور با رمز عبور برابر نیست")
//     .required("شما حتما باید رمز عبور را وارد کنید"),
//   bio: yup.string().max(100, "بیوگرافی نباید بیشتر از ۱۰۰ کاراکتر باشد"),
// });
