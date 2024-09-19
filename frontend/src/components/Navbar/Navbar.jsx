import { useEffect, useState } from "react";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { LuLanguages } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { setLang } from "../../store/languageSlice";
import authService from "../../firebase/auth";
import { useTranslation } from "react-i18next";
import axios from "axios";
import conf from "../../conf/conf";

function Navbar() {
  const { i18n, t } = useTranslation(["navigation"]);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [changeLang, setChangeLang] = useState(false);
  const [activeLang, setActivelang] = useState("");
  const [showOTPbox, setShowOTPbox] = useState(false);
  const [inputOTP, setInputOTP] = useState("");
  const [otp, setOtp] = useState(-1);
  const [isOTPVerified, setIsOTPVerified] = useState(2);
  const navMenu = [
    {
      title: t("home"),
      url: "/",
    },
    {
      title: t("internships"),
      url: "/internships",
    },
    {
      title: t("jobs"),
      url: "/jobs",
    },
  ];
  const [activeProfile, setActiveProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userName = useSelector((state) =>
    authStatus ? state.auth.userData.name : null
  );
  const userEmail = useSelector((state) =>
    authStatus ? state.auth.userData.email : null
  );
  const profilePic = useSelector((state) =>
    authStatus ? state.auth.userData.photoURL : null
  );

  const dispatch = useDispatch();

  const logOutHandler = () => {
    setActiveProfile(false);
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .catch((err) => console.log("Logout Error: err- ", err));
  };

  const sendOTP = () => {
    if (!authStatus) {
      alert("User data not found! Login before change the language");
    } else {
      if (!userEmail) {
        alert("Email id not found");
      } else {
        setLoading(true);
        axios
          .post(`${conf.backendURL}/user/change-lang/${activeLang}`, {
            userName,
            email: userEmail,
          })
          .then((res) => {
            alert(res.data.message);
            setShowOTPbox(true);
            setOtp(res.data.otp);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
            setLoading(false);
          });
      }
    }
  };

  const verifyOTP = () => {
    if (inputOTP == otp) {
      setShowOTPbox(false);
      setChangeLang(false);
      setIsOTPVerified(1);
      setOtp(-1);
      setInputOTP("");
    } else {
      alert("OTP not match!! can't access the website try again..");
    }
  };

  useEffect(() => {
    if (changeLang && activeLang !== "hi") {
      // Load the external script
      const script = document.createElement("script");
      script.src = "https://www.phone.email/sign_in_button_v1.js";
      script.async = true;
      document.querySelector(".pe_signin_button").appendChild(script);

      // Define the listener function
      window.phoneEmailListener = function (userObj) {
        const user_json_url = userObj.user_json_url;
        // Insert the debug message
        document
          .querySelector(".pe_signin_button")
          .insertAdjacentHTML(
            "beforeend",
            `<span>Phone Verification Successful !! <br />Read the following user_json_url from the backend to get the verified phone number - ${user_json_url} <br /> Please delete this debug message code from the phoneEmailListener function once you implement integration step 2.</span>`
          );

        console.log("json url", user_json_url);
        if (user_json_url) {
          setShowOTPbox(false);
          setChangeLang(false);
          setIsOTPVerified(1);
          setOtp(-1);
          setInputOTP("");
        }
      };
      return () => {
        // Cleanup the listener function when the component unmounts
        window.phoneEmailListener = null;
      };
    }
  }, [changeLang, activeLang]);

  useEffect(() => {
    const storedLang = localStorage.getItem("i18nextLng") || "en";
    setActivelang(storedLang);
    if (storedLang !== i18n.language && isOTPVerified === 2) {
      i18n.changeLanguage(storedLang);
    }
    dispatch(setLang(storedLang));
  }, [dispatch, i18n, isOTPVerified]);

  useEffect(() => {
    if (activeLang && activeLang !== i18n.language && isOTPVerified === 1) {
      i18n.changeLanguage(activeLang);
      dispatch(setLang(activeLang));
      localStorage.setItem("i18nextLng", activeLang);
      setIsOTPVerified(0);
    }
  }, [activeLang, dispatch, i18n, isOTPVerified]);

  return !loading ? (
    <div className="w-full py-3 bg-black text-white sticky top-0">
      <div className="w-[90%] sm:w-4/5 mx-auto flex justify-between items-center">
        <div className="flex items-center w-fit gap-1">
          <svg
            width="40"
            height="40"
            viewBox="0 0 142 132"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_7_3)">
              <g clipPath="url(#clip1_7_3)">
                <rect
                  width="76.4819"
                  height="70.4808"
                  transform="matrix(0.9197 0.392621 -0.486761 0.873535 51.353 19.7021)"
                  fill="#EF233C"
                />
                <path
                  d="M55.0748 91.1531C71.2615 98.0632 90.7833 92.1797 98.6781 78.0119C106.573 63.8441 99.8509 46.7571 83.6643 39.847C67.4776 32.9369 47.9558 38.8204 40.0611 52.9882C32.1663 67.156 38.8882 84.243 55.0748 91.1531Z"
                  stroke="#F3F3F3"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <path
                d="M41.5 74.25C59.2191 74.25 73.5833 61.3782 73.5833 45.5C73.5833 29.6218 59.2191 16.75 41.5 16.75C23.7809 16.75 9.41666 29.6218 9.41666 45.5C9.41666 61.3782 23.7809 74.25 41.5 74.25Z"
                stroke="#ffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M61 128.333C78.9493 128.333 93.5 115.648 93.5 100C93.5 84.3519 78.9493 71.6667 61 71.6667C43.0507 71.6667 28.5 84.3519 28.5 100C28.5 115.648 43.0507 128.333 61 128.333Z"
                stroke="#ffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35.5 103.25C53.6794 103.25 68.4167 90.3782 68.4167 74.5C68.4167 58.6218 53.6794 45.75 35.5 45.75C17.3206 45.75 2.58334 58.6218 2.58334 74.5C2.58334 90.3782 17.3206 103.25 35.5 103.25Z"
                stroke="#ffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M83 60.25C100.949 60.25 115.5 47.3782 115.5 31.5C115.5 15.6218 100.949 2.75 83 2.75C65.0507 2.75 50.5 15.6218 50.5 31.5C50.5 47.3782 65.0507 60.25 83 60.25Z"
                stroke="#ffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M106.5 87.25C124.679 87.25 139.417 74.3782 139.417 58.5C139.417 42.6218 124.679 29.75 106.5 29.75C88.3206 29.75 73.5833 42.6218 73.5833 58.5C73.5833 74.3782 88.3206 87.25 106.5 87.25Z"
                stroke="#ffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M100.5 115.25C118.219 115.25 132.583 102.378 132.583 86.5C132.583 70.6218 118.219 57.75 100.5 57.75C82.7809 57.75 68.4167 70.6218 68.4167 86.5C68.4167 102.378 82.7809 115.25 100.5 115.25Z"
                stroke="#ffff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_3">
                <rect width="142" height="132" fill="white" />
              </clipPath>
              <clipPath id="clip1_7_3">
                <rect
                  width="76.4819"
                  height="70.4808"
                  fill="white"
                  transform="matrix(0.9197 0.392621 -0.486761 0.873535 51.353 19.7021)"
                />
              </clipPath>
            </defs>
          </svg>
          <p className="text-2xl font-bold">JobNest</p>
        </div>

        <div className="sm:hidden w-fit" onClick={() => setSidebarActive(true)}>
          <RiMenu3Fill className="text-3xl" />
        </div>

        <div className="w-fit hidden sm:flex gap-3 items-center ">
          <ul className=" flex gap-6">
            {navMenu?.map((el) => (
              <NavLink
                key={el.title}
                to={el.url}
                className={({ isActive }) =>
                  isActive ? "text-[#FF6F61]" : "text-white"
                }
              >
                <li className="text-lg font-semibold">{el.title}</li>
              </NavLink>
            ))}
          </ul>
          {authStatus && (
            <div className="flex gap-4 items-center my-2">
              {profilePic ? (
                <div
                  className="w-7 h-7 text-[12px] flex justify-center items-center border-gray-200 border-solid border-2 rounded-full overflow-hidden cursor-pointer"
                  onClick={() =>
                    setActiveProfile((prev) => setActiveProfile(!prev))
                  }
                >
                  <img
                    src={profilePic}
                    alt="Profile photo"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-7 h-7 text-[12px] flex justify-center items-center border-gray-200 border-solid border-2 rounded-full cursor-pointer"
                  onClick={() =>
                    setActiveProfile((prev) => setActiveProfile(!prev))
                  }
                >
                  {userName ? userName[0].toUpperCase() : " "}
                </div>
              )}

              <div
                className="w-7 h-7 border-gray-200 border-solid border-2 rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => setChangeLang(true)}
              >
                <LuLanguages className="text-lg" />
              </div>

              {activeProfile && (
                <div className="w-fit py-4 px-6 bg-indigo-700 absolute top-[100%] right-[12%]">
                  <ul>
                    <NavLink
                      key="profile"
                      to="/profile"
                      className={({ isActive }) =>
                        isActive ? "text-[#FF6F61]" : "text-white"
                      }
                    >
                      <li
                        className="text-lg font-semibold"
                        onClick={() => setActiveProfile(false)}
                      >
                        {t("profile")}
                      </li>
                    </NavLink>
                    <NavLink
                      key="Subscriptions"
                      to="/subscriptions"
                      className={({ isActive }) =>
                        isActive ? "text-[#FF6F61]" : "text-white"
                      }
                    >
                      <li
                        className="text-lg font-semibold"
                        onClick={() => setActiveProfile(false)}
                      >
                        {t("subscription")}
                      </li>
                    </NavLink>
                    <li
                      className="text-lg font-semibold cursor-pointer"
                      onClick={logOutHandler}
                    >
                      {t("logout")}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {sidebarActive && (
        <div className="ease-in-out duration-[0.75s]">
          <div
            className="h-screen z-7 fixed top-0 w-full "
            onClick={() => setSidebarActive(false)}
          ></div>

          <div
            className={`h-full w-[260px] z-10 fixed top-0 right-0 bg-black  p-6`}
          >
            <RiCloseFill
              className="text-3xl"
              onClick={() => setSidebarActive(false)}
            />

            <div className="mt-5">
              {authStatus && (
                <div className="flex gap-4 items-center my-2">
                  {profilePic ? (
                    <div className="w-8 h-8 text-[12px] flex justify-center items-center border-gray-200 border-solid border-2 rounded-full overflow-hidden cursor-pointer">
                      <img
                        src={profilePic}
                        alt="Profile photo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 text-[12px] flex justify-center items-center border-gray-200 border-solid border-2 rounded-full">
                      {userName ? userName[0].toUpperCase() : " "}
                    </div>
                  )}

                  <div
                    className="w-8 h-8 border-gray-200 border-solid border-2 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setChangeLang(true);
                      setSidebarActive(false);
                    }}
                  >
                    <LuLanguages className="text-xl" />
                  </div>
                </div>
              )}
              <ul>
                {navMenu?.map((el) => (
                  <NavLink
                    key={el.title}
                    to={el.url}
                    className={({ isActive }) =>
                      isActive ? "text-[#FF6F61]" : "text-white"
                    }
                  >
                    <li className="text-lg font-semibold">{el.title}</li>
                  </NavLink>
                ))}
                {authStatus ? (
                  <>
                    <NavLink
                      key="profile"
                      to="/profile"
                      className={({ isActive }) =>
                        isActive ? "text-[#FF6F61]" : "text-white"
                      }
                    >
                      <li className="text-lg font-semibold">{t("profile")}</li>
                    </NavLink>
                    <NavLink
                      key="Subscriptions"
                      to="/subscriptions"
                      className={({ isActive }) =>
                        isActive ? "text-[#FF6F61]" : "text-white"
                      }
                    >
                      <li className="text-lg font-semibold">
                        {t("subscription")}
                      </li>
                    </NavLink>
                    <li
                      className="text-lg font-semibold cursor-pointer"
                      onClick={logOutHandler}
                    >
                      {t("logout")}
                    </li>
                  </>
                ) : (
                  <div className="space-y-3 my-2">
                    <div
                      className="min-w-[90px] w-fit py-1 px-4 font-semibold border-solid border-[#FF6F61] border-2 rounded-lg text-center bg-black bg-opacity-40 cursor-pointer"
                      onClick={() => {
                        setSidebarActive(false);
                        navigate("/login");
                      }}
                    >
                      {t("login")}
                    </div>
                    <div
                      className="min-w-[90px] w-fit py-1 px-4 font-semibold border-solid border-indigo-700 border-2 rounded-lg text-center bg-indigo-700 cursor-pointer"
                      onClick={() => navigate("/signUp")}
                    >
                      {t("register")}
                    </div>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      {changeLang && (
        <div className="w-full h-screen bg-[#2d2c2cd4] fixed top-0 z-20 flex justify-center items-center">
          <div className="w-[300px] md:w-[500px] h-[300px] bg-white rounded-lg text-black p-3">
            {showOTPbox ? (
              <div>
                <div>
                  <RiCloseFill
                    className="text-3xl absolute right-4 z-21"
                    onClick={() => setChangeLang(false)}
                  />
                  <p className="font-bold md:text-xl text-center">Verify OTP</p>
                </div>

                <div className="flex flex-col items-center justify-center h-[200px] gap-2">
                  <p>Enter 6 digit OTP</p>
                  <input
                    type="text"
                    value={inputOTP}
                    onChange={(e) => setInputOTP(e.target.value)}
                    className="border-solid border-2 border-gray-500 rounded"
                  />
                  <div className="flex gap-2 mt-5">
                    <div
                      className="w-fit h-fit flex bg-indigo-700 text-white font-bold px-7 py-1 rounded-md cursor-pointer"
                      onClick={() => {
                        setChangeLang(false);
                        setShowOTPbox(false);
                      }}
                    >
                      Cancle
                    </div>
                    <div
                      className="w-fit h-fit flex bg-indigo-700 text-white font-bold px-7 py-1 rounded-md cursor-pointer"
                      onClick={verifyOTP}
                    >
                      Verify OTP
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <RiCloseFill
                    className="text-3xl absolute right-4 z-21"
                    onClick={() => setChangeLang(false)}
                  />
                  <p className="font-bold md:text-xl text-center">
                    Choose a language
                  </p>
                </div>
                <div className="space-y-3 my-3 mx-2">
                  <input
                    type="radio"
                    name="lang"
                    value="en"
                    checked={activeLang === "en" ? true : false}
                    onChange={(e) => setActivelang(e.target.value)}
                  />{" "}
                  English (default)
                  <br />
                  <input
                    type="radio"
                    name="lang"
                    value="hi"
                    checked={activeLang === "hi" ? true : false}
                    onChange={(e) => setActivelang(e.target.value)}
                  />{" "}
                  Hindi <br />
                  <input
                    type="radio"
                    name="lang"
                    value="fr"
                    checked={activeLang === "fr" ? true : false}
                    onChange={(e) => setActivelang(e.target.value)}
                  />{" "}
                  French <br />
                  <input
                    type="radio"
                    name="lang"
                    value="sp"
                    checked={activeLang === "sp" ? true : false}
                    onChange={(e) => setActivelang(e.target.value)}
                  />{" "}
                  Spanish <br />
                  <input
                    type="radio"
                    name="lang"
                    value="po"
                    checked={activeLang === "po" ? true : false}
                    onChange={(e) => setActivelang(e.target.value)}
                  />{" "}
                  Portugese <br />
                  <input
                    type="radio"
                    name="lang"
                    value="ch"
                    checked={activeLang === "ch" ? true : false}
                    onChange={(e) => setActivelang(e.target.value)}
                  />{" "}
                  Chinese <br />
                </div>

                <div className="flex  justify-between mt-5">
                  <div
                    className="w-fit h-fit flex bg-indigo-700 text-white font-bold px-7 py-1 rounded-md cursor-pointer"
                    onClick={() => {
                      setChangeLang(false);
                      setShowOTPbox(false);
                    }}
                  >
                    Cancle
                  </div>
                  {activeLang === "hi" && (
                    <div
                      className="w-fit h-fit flex bg-indigo-700 text-white font-bold px-7 py-1 rounded-md cursor-pointer"
                      onClick={sendOTP}
                    >
                      Send OTP
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeLang !== "hi" && (
              <div
                className="pe_signin_button "
                data-client-id="18308809394300291383"
              ></div>
            )}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="h-screen w-full bg-gray-600 flex justify-center items-center text-white font-bold p-3">
      Please wait while Loading....
    </div>
  );
}

export default Navbar;
