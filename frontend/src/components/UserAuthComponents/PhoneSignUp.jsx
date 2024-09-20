import { useState } from "react";
import { auth } from "../../firebase/firebase.js";
import PhoneInput from "react-phone-number-input";
import Input from "./Input";
import "react-phone-number-input/style.css";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../../store/authSlice";
import authService from "../../firebase/auth.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import conf from "../../conf/conf";
import { detect } from "detect-browser";

const PhoneSignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation(["user", "common"]);

  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const sendOtp = async () => {
    if (!phoneNumber && !name && !email) {
      alert("Empty field!!");
    } else {
      try {
        console.log(phoneNumber);
        const recaptcha = new RecaptchaVerifier(auth, "recaptca", {});
        const confirmation = await signInWithPhoneNumber(
          auth,
          "+" + phoneNumber,
          recaptcha
        );
        console.log(confirmation);
        setConfirmationResult(confirmation);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const verifyCode = async () => {
    try {
      await confirmationResult.confirm(verificationCode);

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      await hist(auth.currentUser.uid, email);

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
      <Input
        label={t("labels.name")}
        placeholder={t("placeholders.name")}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label={t("labels.email")}
        placeholder={t("placeholders.name")}
        onChange={(e) => setEmail(e.target.value)}
      />
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

export default PhoneSignUp;
