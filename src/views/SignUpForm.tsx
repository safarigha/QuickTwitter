import React, { useState, ChangeEvent, FormEvent } from "react";
import { useSignUp } from "../components/signup";
import { NavLink } from "react-router-dom";
import API_PATHS from "../configs/API_PATHS";
import {
  validateStepOne,
  validateStepTwo,
  FormError,
} from "../validations/signUpValidation";
import { toast } from "react-toastify";

// FormData type
type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  bio: string;
};

const SignUpForm: React.FC = () => {
  const { mutate } = useSignUp();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    bio: "",
  });

  const [error, setError] = useState<FormError>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    let errors = {};
    if (step === 1) {
      errors = validateStepOne(formData);
    } else if (step === 2) {
      errors = validateStepTwo(formData);
    }

    if (Object.keys(errors).length === 0) {
      setStep(step + 1);
    } else {
      setError(errors);
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorsStepTwo = validateStepTwo(formData);
    if (Object.keys(errorsStepTwo).length > 0) {
      setError(errorsStepTwo);
      return;
    }
    try {
      mutate(formData, {
        onSuccess: () => {
          toast.success("ثبت نام با موفقیت انجام شد", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        },
        onError: (error: any) => {
          toast.error(
            `خطا در ثبت نام: ${error.response?.data?.message || error.message}`,
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      bio: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-indigo-50 max-w-md w-full space-y-8 p-5 rounded-lg">
        <div>
          <img
            src={`/Logo_of_Twitter.png`}
            alt="logo"
            className="fill-indigo-600 m-5 w-20 h-20 mx-auto"
          />
        </div>
        {step === 1 && (
          <form
            className="mt-8 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="custom-font text-right block text-s font-medium text-indigo-600"
              >
                ایمیل
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md"
              />
              {error.email && (
                <p className="mt-2 text-sm text-red-600">{error.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="custom-font text-right block text-s font-medium text-indigo-600"
              >
                رمز عبور
              </label>
              <input
                id="password1"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md"
              />
              {error.password && (
                <p className="mt-2 text-sm text-red-600">{error.password}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="custom-font text-right block text-s font-medium text-indigo-600"
              >
                تایید رمز عبور
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md"
              />
              {error.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">
                  {error.confirmPassword}
                </p>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={handleNext}
                className="custom-font mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                بعدی
              </button>
              <NavLink
                to={`/${API_PATHS.LOGIN}`}
                className="custom-font text-center block text-sm font-medium text-indigo-600 mt-3"
              >
                حساب کاربری دارم
              </NavLink>
            </div>
          </form>
        )}
        {step === 2 && (
          <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
            <div>
              <label
                htmlFor="username"
                className="custom-font text-right block text-s font-medium text-indigo-600"
              >
                نام کاربری
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md"
              />
              {error.username && (
                <p className="mt-2 text-sm text-red-600">{error.username}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="bio"
                className="custom-font text-right block text-s font-medium text-indigo-600"
              >
                بیوگرافی
              </label>
              <textarea
                id="bio"
                name="bio"
                autoComplete="bio"
                placeholder="Bio"
                value={formData.bio}
                onChange={handleChange}
                className="mt-1 p-2 w-full border-gray-300 rounded-md"
              />
              {error.bio && (
                <p className="mt-2 text-sm text-red-600">{error.bio}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="custom-font mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                ثبت نام
              </button>
              <NavLink
                to={`/${API_PATHS.LOGIN}`}
                className="custom-font text-center block text-sm font-medium text-indigo-600 mt-3"
              >
                وارد شوید
              </NavLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { signUp } from "../components/signup";
// import API_PATHS from "../configs/API_PATHS";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { signUpSchema } from "../validations/signUpValidation";

// const SignUpForm: React.FC = () => {
//   const [step, setStep] = useState<number>(1);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//       vpassword: "",
//       bio: "",
//     },
//     resolver: yupResolver(signUpSchema),
//   });

//   const handleNext = async () => {
//     try {
//       // اجرای ولیدیشن بر روی داده‌ها با استفاده از validate
//       await signUpSchema.validate({ abortEarly: false });

//       // اگر ولیدیشن با موفقیت انجام شود، به مرحله‌ی بعدی بروید
//       setStep(step + 1);
//     } catch (error) {
//       // اگر ولیدیشن با خطا مواجه شود، خطاها را چاپ کنید
//       console.error("Validation error occurred:", error);
//     }
//   };

//   const onSubmit = async (data: any) => {
//     try {
//       // ارسال داده‌های به signUp
//       const response = await signUp(data);
//       console.log("Form submitted!", response);
//     } catch (error) {
//       console.error("Error occurred while signing up:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-950 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="bg-indigo-50 max-w-md w-full space-y-8 p-5 rounded-lg">
//         <div>
//           <img
//             src={`${process.env.PUBLIC_URL}/Logo_of_Twitter.png`}
//             alt="logo"
//             className="fill-indigo-600 m-5 w-20 h-20 mx-auto"
//           />
//         </div>
//         {step === 1 && (
//           <form
//             className="mt-8 space-y-6"
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleNext();
//             }}
//           >
//             <div>
//               <label
//                 htmlFor="email"
//                 className="custom-font text-right block text-s font-medium text-indigo-600"
//               >
//                 ایمیل
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 placeholder="example@example.com"
//                 {...register("email")}
//                 className="mt-1 p-2 w-full border-gray-300 rounded-md"
//               />
//               {errors.email && typeof errors.email.message === "string" && (
//                 <p className="mt-2 text-sm text-red-600">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>
//             {/* Other form fields go here */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="custom-font text-right block text-s font-medium text-indigo-600"
//               >
//                 رمز عبور
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 autoComplete="password"
//                 required
//                 placeholder="********"
//                 {...register("password")}
//                 className="mt-1 p-2 w-full border-gray-300 rounded-md"
//               />
//               {errors.password &&
//                 typeof errors.password.message === "string" && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {errors.password.message}
//                   </p>
//                 )}
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="custom-font text-right block text-s font-medium text-indigo-600"
//               >
//                 رمز عبور
//               </label>
//               <input
//                 id="vpassword"
//                 type="password"
//                 autoComplete="password"
//                 required
//                 placeholder="********"
//                 className="mt-1 p-2 w-full border-gray-300 rounded-md"
//               />
//               {errors.password &&
//                 typeof errors.password.message === "string" && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {errors.password.message}
//                   </p>
//                 )}
//             </div>

//             <button
//               type="submit"
//               className="custom-font mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               بعدی
//             </button>
//             <NavLink
//               to={`/${API_PATHS.LOGIN}`}
//               className="custom-font text-center block text-sm font-medium text-indigo-600 mt-3"
//             >
//               حساب کاربری دارم
//             </NavLink>
//           </form>
//         )}
//         {step === 2 && (
//           // Step 2 form content
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//               <label
//                 htmlFor="username"
//                 className="custom-font text-right block text-s font-medium text-indigo-600"
//               >
//                 نام کاربری
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 autoComplete="username"
//                 required
//                 placeholder="Username"
//                 {...register("username")}
//                 className="mt-1 p-2 w-full border-gray-300 rounded-md"
//               />
//               {errors.username &&
//                 typeof errors.username.message === "string" && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {errors.username.message}
//                   </p>
//                 )}
//             </div>
//             <div>
//               <label
//                 htmlFor="bio"
//                 className="custom-font text-right block text-s font-medium text-indigo-600"
//               >
//                 بیوگرافی
//               </label>
//               <textarea
//                 id="bio"
//                 autoComplete="bio"
//                 placeholder="Bio"
//                 {...register("bio")}
//                 className="mt-1 p-2 w-full border-gray-300 rounded-md"
//               />
//               {errors.bio && typeof errors.bio.message === "string" && (
//                 <p className="mt-2 text-sm text-red-600">
//                   {errors.bio.message}
//                 </p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="custom-font mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               ثبت نام
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
