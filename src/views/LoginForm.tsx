import React, { useState, FormEvent, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/tailwind.css";
import API_PATHS from "../configs/API_PATHS";
import { validateLogin } from "../validations/loginValidation";
import { toast } from "react-toastify";
import { useLogin } from "../components/login";
import { useUser } from "../contexts/UserContext";

type FormData = {
  username: string;
  password: string;
};

type FormError = {
  username?: string;
  password?: string;
};

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<FormError>({});
  const { setUsername } = useUser();
  const { mutate } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateLogin(formData);
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    try {
      mutate(formData, {
        onSuccess: async (data: any) => {
          setUsername(formData.username);
          localStorage.setItem("token", data.token);
          navigate(API_PATHS.HOME);
          toast.success("ورود موفقیت‌آمیز بود", {
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
            `خطا در ورود: ${error.response?.data?.message || error.message}`,
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
        <form className="mt-8 space-y-6" onSubmit={onHandleSubmit}>
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
              htmlFor="password"
              className="custom-font text-right block text-sm font-medium text-indigo-600"
            >
              رمز عبور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
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
            <button
              type="submit"
              className="custom-font mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ورود
            </button>
            <NavLink
              to={`/${API_PATHS.SIGNUP}`}
              className="custom-font text-center block text-sm font-medium text-indigo-600 mt-3"
            >
              !هنوز ثبت نام نکرده ام
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
