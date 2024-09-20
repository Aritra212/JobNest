import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from "./firebase/auth.js";
import { detect } from "detect-browser";
import axios from "axios";
import conf from "./conf/conf.js";

function App() {
  const [loading, setLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(true);
  const [msg, setMsg] = useState("");
  const [showOTPbox, setShowOTPbox] = useState(false);
  const [inputOTP, setInputOTP] = useState("");
  const [otp, setOtp] = useState(-1);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) =>
    authStatus ? state.auth.userData : null
  );
  const browser = detect();

  const verifyOtp = () => {
    if (inputOTP == otp) {
      setShowOTPbox(false);
      setIsOTPVerified(true);
      setLoading(false);
      setOtp(-1);
      setInputOTP("");
    } else {
      alert("OTP not match!! can't access the website try again..");
    }
  };

  useEffect(() => {
    if (authStatus && browser.name === "chrome" && !isOTPVerified) {
      if (user.email)
        axios
          .post(`${conf.backendURL}/user/check-browser`, {
            browser: browser.name,
            userName: user.name,
            email: user.email,
          })
          .then((res) => {
            alert(res.data.message);
            setShowOTPbox(true);
            setOtp(res.data.otp);
          })
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
          });
      else {
        setCanAccess(false);
        setLoading(true);
        setMsg("Access denied! can't send otp");
      }
    } else {
      setLoading(false);
    }
  }, [authStatus, browser.name, isOTPVerified]);

  useEffect(() => {
    console.log(1);
    const isMobile = /Mobi/i.test(navigator.userAgent);
    const currentHour = new Date().getHours();

    if (isMobile && (currentHour < 10 || currentHour > 13)) {
      setCanAccess(false);
      setLoading(true);
      setMsg(
        "Access denied! you can only access the site during 10 AM to 1PM from Mobile device"
      );
    } else {
      authService
        .getCurrentUser()
        .then((userData) => {
          console.log("userData: ", userData);
          if (userData) {
            dispatch(login(userData));
          } else {
            dispatch(logout());
            navigate("/");
          }
        })
        .finally(() => browser.name != "chrome" && setLoading(false));
    }
  }, [dispatch, navigate, browser.name]);

  return !loading && !showOTPbox ? (
    <>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-260px)] flex justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </>
  ) : showOTPbox ? (
    <div className="h-screen w-full bg-gray-600 flex justify-center items-center text-white font-bold p-3">
      <div className="space-y-2">
        <p>Enter OTP</p>
        <input
          type="number"
          value={inputOTP}
          onChange={(e) => setInputOTP(e.target.value)}
          className="outline-none rounded px-4 py-1 text-black font-normal"
        />
        <div
          className="px-3 py-1 bg-green-600 w-fit mx-auto rounded-lg hover:bg-indigo-700 cursor-pointer"
          onClick={verifyOtp}
        >
          Verify
        </div>
      </div>
    </div>
  ) : (
    <div className="h-screen w-full bg-gray-600 flex justify-center items-center text-white font-bold p-3">
      {canAccess ? "Please wait while Loading...." : msg}
    </div>
  );
}

export default App;
