import { useSelector } from "react-redux";
import { IoIosCamera } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
// import ProfileUpdate from "../components/UserAuthComponents/ProfileUpdate";
import { useState } from "react";
import authService from "../firebase/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";
import { useTranslation } from "react-i18next";
// import JobDetailsCard from "../components/Cards/JobDetailsCard";

function Profile() {
  const profilePhoto = useSelector((state) =>
    state.auth.status ? state.auth.userData.photoURL : null
  );
  const user = useSelector((state) =>
    state.auth.status ? state.auth.userData : null
  );
  const [selectPhoto, setSelectPhoto] = useState(false);
  const [activeMode, setActiveMode] = useState("");
  const [userData, setUserData] = useState([]);
  const { t } = useTranslation(["user", "common"]);
  // const [jobData, setJobData] = useState({});

  const [photo, setPhoto] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const viewJobData = (jobId, jobType) => {
  //   setActiveMode("viewjob");
  //   axios
  //     .get(`${conf.backendURL}/${jobType}/${jobId}`)
  //     .then((res) => {
  //       setJobData(res.data.data);
  //       console.log(res);
  //       alert(res.data.message);
  //     })
  //     .catch((error) => {
  //       alert(error.response.data.message);
  //       console.error(error);
  //     });
  // };

  const handleApplicationData = () => {
    setUserData([]);
    setActiveMode("applications");
    axios
      .get(`${conf.backendURL}/application/user/${user.id}`)
      .then((res) => {
        setUserData(res.data.data);
        alert(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message);
      });
  };

  const handleLoginHistory = () => {
    setUserData([]);
    setActiveMode("history");
    axios
      .get(`${conf.backendURL}/user/history/${user.id}`)
      .then((res) => {
        console.log(res);
        setUserData(res.data.data);
        alert(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message);
      });
  };

  const handleSubscriptionHistory = () => {
    setUserData(null);
    setActiveMode("subscription");
    axios
      .get(`${conf.backendURL}/payment/history/${user.id}`)
      .then((res) => {
        console.log(res);
        setUserData(res.data.data);
        alert(res.data.message);
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message);
      });
  };

  const handleUploadPic = () => {
    setSelectPhoto(false);
    authService.updateProfilePic(photo);
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
      .finally(
        alert(
          "Profile picture updated successfully. If not able to see refresh the page.."
        )
      );
  };

  return (
    <div className="mb-10 w-4/5 md:w-11/12">
      {activeMode === "" && (
        <div>
          <div className="w-fit mx-auto my-5">
            {profilePhoto ? (
              <>
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
                  <img
                    src={profilePhoto}
                    alt="Profile Picture"
                    className="object-cover w-full h-full"
                  />
                </div>
                <IoIosCamera
                  className="w-fit mx-auto mt-[1px] text-3xl text-gray-600 cursor-pointer"
                  onClick={() => setSelectPhoto(true)}
                />
              </>
            ) : (
              <div
                className="w-fit flex mx-auto my-3 bg-indigo-700 text-white font-bold px-10 py-2 rounded-md cursor-pointer"
                onClick={() => setSelectPhoto(true)}
              >
                {t("btns.b2")}
              </div>
            )}
          </div>

          {selectPhoto && (
            <div className="absolute top-[100px] border-solid border-2 border-gray-500 bg-white rounded-lg h-[200px] w-[250px] sm:w-[400px] z-10 flex flex-col gap-7 justify-center items-center">
              <input
                type="file"
                name="profilepic"
                className="w-[220px]"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setPhoto(event.target.files[0]);
                }}
              />
              <div className="flex gap-4">
                <div
                  className="py-2 px-3 bg-indigo-700 text-white rounded cursor-pointer"
                  onClick={() => setSelectPhoto(false)}
                >
                  {t("common:cancel")}
                </div>
                <div
                  className="py-2 px-3 bg-indigo-700 text-white rounded cursor-pointer"
                  onClick={handleUploadPic}
                >
                  {t("common:update")}
                </div>
              </div>
            </div>
          )}
          <div>{/* <ProfileUpdate /> */}</div>
          <div className="w-[250px] sm:w-[400px] px-3 py-2 border-solid border-2 border-gray-400 rounded-lg mx-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-3">
              {t("profile.title")}
            </h2>
            <p>
              <span className="font-semibold">{t("profile.name")}: </span>
              {user?.name}
            </p>
            {user?.email && (
              <p>
                <span className="font-semibold">{t("profile.email")}: </span>
                {user?.email}
              </p>
            )}
            {user?.phone && (
              <p>
                <span className="font-semibold">{t("profile.phone")}: </span>
                {user?.phone}
              </p>
            )}
            <p className="text-xs">
              <span className="font-semibold text-base">
                {t("profile.userid")}:{" "}
              </span>
              {user?.id}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            <div
              className="w-fit py-2 px-3 bg-indigo-700 text-white rounded cursor-pointer"
              onClick={handleApplicationData}
            >
              {t("profile.btns.b1")}
            </div>
            <div
              className="w-fit py-2 px-3 bg-indigo-700 text-white rounded cursor-pointer"
              onClick={handleLoginHistory}
            >
              {t("profile.btns.b2")}
            </div>
            <div
              className="w-fit py-2 px-3 bg-indigo-700 text-white rounded cursor-pointer"
              onClick={handleSubscriptionHistory}
            >
              {t("profile.btns.b3")}
            </div>
          </div>
        </div>
      )}
      {activeMode === "applications" && (
        <div>
          <h1 className="text-xl sm:text-3xl font-bold my-2 text-gray-700 text-center">
            {t("profile.btns.b1")}
          </h1>

          {userData.length ? (
            <div>
              <p
                className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 my-3 rounded-lg cursor-pointer"
                onClick={() => setActiveMode("")}
              >
                <FaArrowLeftLong /> {t("common:back")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {userData?.map((el) => (
                  <div
                    key={el._id}
                    className="w-[300px] p-2 shadow-lg border-solid border-2 border-gray-400 text-sm rounded-lg"
                  >
                    <p>
                      {t("profile.jobid")} - {el.jobId}
                    </p>
                    <p>
                      {t("profile.jobtype")} - {el.category}
                    </p>
                    <p>
                      {t("profile.appid")} - {el._id}
                    </p>
                    {/* <div
                      className="w-fit flex mt-2 bg-indigo-700 text-white font-bold px-5 py-[3px] rounded-md cursor-pointer"
                      onClick={() => viewJobData(el.jobId, el.category)}
                    >
                      view job
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center font-semibold">{t("profile.msg.m1")}</p>
              <p
                className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 mx-auto my-3 rounded-lg cursor-pointer"
                onClick={() => setActiveMode("")}
              >
                <FaArrowLeftLong /> {t("common:back")}
              </p>
            </div>
          )}
        </div>
      )}
      {activeMode === "history" && (
        <div>
          <h1 className="text-xl sm:text-3xl font-bold my-2 text-gray-700 text-center">
            {t("profile.btns.b2")}
          </h1>

          {userData.length ? (
            <div>
              <p
                className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 my-3 rounded-lg cursor-pointer"
                onClick={() => setActiveMode("")}
              >
                <FaArrowLeftLong /> {t("common:back")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {userData?.map((el) => (
                  <div
                    key={el._id}
                    className="w-[300px] p-2 shadow-lg border-solid border-2 border-gray-400 text-sm rounded-lg"
                  >
                    <p>
                      {t("profile.browser")} - {el.browser}
                    </p>
                    <p>
                      {t("profile.os")} - {el.os}
                    </p>
                    <p>
                      {t("profile.ip")} - {el.ipAddress}
                    </p>
                    <p>
                      {t("profile.device")} - {el.deviceType}
                    </p>
                    <p>
                      {t("profile.logintime")} - {Date(el.loginTime)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center font-semibold">{t("profile.msg.m1")}</p>
              <p
                className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 mx-auto my-3 rounded-lg cursor-pointer"
                onClick={() => setActiveMode("")}
              >
                <FaArrowLeftLong /> {t("common:back")}
              </p>
            </div>
          )}
        </div>
      )}
      {activeMode === "subscription" && (
        <div>
          <h1 className="text-xl sm:text-3xl font-bold my-2 text-gray-700 text-center">
            {t("profile.msg.m2")}
          </h1>

          {userData ? (
            <div>
              <p
                className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 my-3 rounded-lg cursor-pointer"
                onClick={() => setActiveMode("")}
              >
                <FaArrowLeftLong /> {t("common:back")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <div className="w-[300px] p-2 shadow-lg border-solid border-2 border-gray-400 text-sm rounded-lg">
                  <p>
                    {t("profile.paymentid")} - {userData.paymentId}
                  </p>
                  <p>
                    {t("profile.activeplans")} -{" "}
                    {userData.plan?.split("+").toString()}
                  </p>
                  <p>
                    {t("profile.appleft")} - {userData.internshipLimit}
                  </p>
                  <p>
                    {t("profile.updateat")} - {Date(userData.updateAt)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-center font-semibold">{t("profile.msg.m1")}</p>
              <p
                className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 mx-auto my-3 rounded-lg cursor-pointer"
                onClick={() => setActiveMode("")}
              >
                <FaArrowLeftLong /> {t("common:back")}
              </p>
            </div>
          )}
        </div>
      )}
      {/* {activeMode === "viewjob" &&
        (jobData ? (
          <JobDetailsCard data={jobData} backfn={() => setActiveMode("")} />
        ) : (
          <p>No data to show</p>
        ))} */}
    </div>
  );
}

export default Profile;
