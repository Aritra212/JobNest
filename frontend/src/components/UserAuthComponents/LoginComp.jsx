import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import Input from "./Input";
import { useDispatch } from "react-redux";
import authService from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { detect } from "detect-browser";
import axios from "axios";
import conf from "../../conf/conf";
import { useTranslation } from "react-i18next";

function LoginComp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const { t } = useTranslation(["user", "navigation"]);

  const browser = detect();
  const hist = async (userId, email) => {
    await axios
      .post(`${conf.backendURL}/user/history`, {
        browser: browser.name,
        email,
        os: browser.os,
        isMobile: /Mobi/i.test(navigator.userAgent),
        userId,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      // console.log("Session: ", session);
      if (session) {
        const userData = await authService.getCurrentUser();
        // console.log("userData: ", userData);
        if (userData) {
          hist(userData.id, userData.email);
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div
      className={`mx-auto w-full bg-gray-100 rounded-xl  flex justify-center items-center`}
    >
      <div>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-5 w-full">
            <Input
              label={t("labels.email")}
              placeholder={t("placeholders.email")}
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label={t("labels.password")}
              type="password"
              placeholder={t("placeholders.password")}
              {...register("password", {
                required: true,
              })}
            />
            <button
              type="submit"
              className="w-full py-1 rounded-md bg-blue-500 text-white font-bold"
            >
              {t("navigation:login")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComp;
