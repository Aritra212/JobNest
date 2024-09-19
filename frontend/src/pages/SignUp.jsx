import { useState } from "react";
import SignupComp from "../components/UserAuthComponents/SignupComp";
import { Link } from "react-router-dom";
import PhoneSignUp from "../components/UserAuthComponents/PhoneSignUp";
import authService from "../firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";

import { FcGoogle } from "react-icons/fc";
import { IoIosMail } from "react-icons/io";
import { MdPermPhoneMsg } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import heroImg from "../assets/images/heroImg.jpg";
import { useTranslation } from "react-i18next";

function Signup() {
  const [signUpMethod, setSignUpMethod] = useState("");
  const { t } = useTranslation(["user", "navigation", "common"]);

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  const dispatch = useDispatch();

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
          className={`mx-auto max-w-md sm:max-w-lg bg-gray-100 rounded-xl p-5  sm:p-10 border border-black/10 flex flex-col items-center`}
        >
          <div className="mb-5">
            <h2 className="text-center text-xl sm:text-2xl font-bold leading-tight">
              {t("user:signUp.title")}
            </h2>
            <p className="mt-2 text-center text-sm sm:text-base text-black/60">
              {t("signUp.p1")}&nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 text-blue-600 hover:underline"
              >
                {t("navigation:login")}
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
                {t("signUp.p2")}
              </div>
              <div
                className="flex gap-2 items-center bg-white p-3 px-2 box-border rounded-md cursor-pointer"
                onClick={() => setSignUpMethod("email")}
              >
                <IoIosMail className="text-red-700 sm:text-2xl" />
                {t("signUp.p3")}
              </div>
              <div
                className="flex gap-2 items-center bg-white p-3 px-2 box-border rounded-md cursor-pointer"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle className="sm:text-2xl" />
                {t("signUp.p4")}
              </div>
              <p className="text-xs sm:text-sm text-gray-500 text-center">
                {t("signUp.p5")}
              </p>
            </div>
          )}
          {signUpMethod === "phone" && <PhoneSignUp />}
          {signUpMethod === "email" && <SignupComp />}
          {signUpMethod !== "" && (
            <div
              className="w-full flex justify-start gap-2 items-center text-blue-600 cursor-pointer hover:underline mt-2"
              onClick={() => setSignUpMethod("")}
            >
              <FaArrowLeftLong /> {t("common:back")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
