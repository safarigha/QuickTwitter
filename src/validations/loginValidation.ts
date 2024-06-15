export type FormData = {
  username: string;
  password: string;
};

export type FormError = Partial<FormData>;

export const validateLogin = (formData: FormData): FormError => {
  const newError: FormError = {};

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
