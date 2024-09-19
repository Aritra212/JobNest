import LoginComp from "../components/UserAuthComponents/LoginComp";
import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneLogin from "../components/UserAuthComponents/PhoneLogin";
import authService from "../firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

import { FcGoogle } from "react-icons/fc";
import { IoIosMail } from "react-icons/io";
import { MdPermPhoneMsg } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import heroImg from "../assets/images/heroImg.jpg";
import AdminLogin from "../components/UserAuthComponents/AdminLogin";
import { useTranslation } from "react-i18next";

function Login() {
  const [signUpMethod, setSignUpMethod] = useState("");
  const [loginType, setLoginType] = useState("student");
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation(["user", "navigation", "common"]);

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const userData = await authService.signInWithGoogle();
      if (userData) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center "
      style={{
        background: `linear-gradient(to top, rgb(32 9 46 / 63%) 0%, rgb(3 3 3 / 83%) 61%), url('${heroImg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full mt-3 min-h-[calc(100vh-80px)] flex items-center justify-center">
        <div
          className={`mx-auto max-w-md sm:max-w-lg bg-gray-100 rounded-xl p-5 sm:p-10 border border-black/10 flex flex-col items-center`}
        >
          <div className="flex text-center font-bold w-11/12 mx-auto mb-3 text-gray-600">
            <div
              className={`w-1/2 cursor-pointer pb-1 ${
                loginType == "student" &&
                "text-blue-500 border-b-4 border-blue-500 border-solid "
              }`}
              onClick={() => setLoginType("student")}
            >
              {t("common:student")}
            </div>
            <div
              className={`w-1/2 cursor-pointer pb-1 ${
                loginType == "admin" &&
                "text-blue-500 border-b-4 border-blue-500 border-solid"
              }`}
              onClick={() => setLoginType("admin")}
            >
              {t("common:admin")}
            </div>
          </div>
          {loginType === "student" && (
            <div>
              <div className="mb-5">
                <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
                  {t("login.title")}
                </h2>
                <p className="mt-2 text-center text-sm sm:text-base text-black/60">
                  {t("login.p1")}
                  <Link
                    to="/signUp"
                    className="font-medium text-primary transition-all duration-200 hover:underline text-blue-600"
                  >
                    {t("navigation:signup")}
                  </Link>
                </p>
              </div>
              {signUpMethod === "" && (
                <div className="text-sm sm:text-lg flex flex-col gap-4">
                  <div
                    className="flex gap-2 items-center bg-white p-3 px-2 box-border rounded-md cursor-pointer"
                    onClick={() => setSignUpMethod("phone")}
                  >
                    <MdPermPhoneMsg className="sm:text-2xl" />
                    {t("login.p2")}
                  </div>
                  <div
                    className="flex gap-2 items-center bg-white p-3 px-2 box-border rounded-md cursor-pointer"
                    onClick={() => setSignUpMethod("email")}
                  >
                    <IoIosMail className="text-red-700 sm:text-2xl" />
                    {t("login.p3")}
                  </div>
                  <div
                    className="flex gap-2 items-center bg-white p-3 px-2 box-border rounded-md cursor-pointer"
                    onClick={handleGoogleSignIn}
                  >
                    <FcGoogle className="sm:text-2xl" />
                    {t("login.p4")}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 text-center">
                    {t("login.p5")}
                  </p>
                </div>
              )}
              {signUpMethod === "phone" && <PhoneLogin />}
              {signUpMethod === "email" && <LoginComp />}
              {signUpMethod !== "" && (
                <div
                  className="w-full flex justify-start gap-2 items-center text-blue-600 cursor-pointer hover:underline mt-2"
                  onClick={() => setSignUpMethod("")}
                >
                  <FaArrowLeftLong /> {t("common:back")}
                </div>
              )}
            </div>
          )}
          {loginType == "admin" && <AdminLogin />}
        </div>
      </div>
    </div>
  );
}

export default Login;
