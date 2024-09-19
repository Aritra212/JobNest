import { useState } from "react";
// import authService from "../firebase/auth";
import { auth } from "../../firebase/firebase";
import PhoneInput from "react-phone-number-input";
import Input from "./Input";
import "react-phone-number-input/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/authSlice";
import authService from "../../firebase/auth.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState("");
  const { t } = useTranslation(["user", "common"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptca", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptcha
      );
      console.log(confirmation);
      setConfirmationResult(confirmation);
    } catch (err) {
      console.log(err);
    }
  };

  const verifyCode = async () => {
    try {
      await confirmationResult.confirm(verificationCode);
      authService.getCurrentUser().then((userData) => {
        console.log("userData: ", userData);
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }

        navigate("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-md mb-1 pl-1">{t("labels.phone")}</p>
        <PhoneInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          placeholder={t("placeholders.phone")}
          className="px-3 py-1 rounded-md bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
        />
      </div>
      <button
        onClick={sendOtp}
        className="w-full py-1 rounded-md bg-blue-500 text-white font-bold box-border my-3"
      >
        {t("common:sendOtp")}
      </button>

      {!confirmationResult && (
        <div
          id="recaptca"
          className="scale-75 sm:scale-100 ml-[-30px] sm:ml-0"
        ></div>
      )}

      {confirmationResult && (
        <div>
          <Input
            label={t("common:labels.otp")}
            placeholder={t("common:placeholders.otp")}
            required={true}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button
            onClick={verifyCode}
            className="w-full py-1 rounded-md bg-blue-500 text-white font-bold box-border my-5"
          >
            {t("common:verifyOtp")}
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneLogin;
