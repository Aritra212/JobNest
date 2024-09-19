import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/images/heroImg.jpg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function Hero() {
  const user = useSelector((state) => state.auth.status);
  const { t } = useTranslation(["home", "navigation"]);
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        background: `linear-gradient(to top, rgb(32 9 46 / 63%) 0%, rgb(3 3 3 / 83%) 61%), url('${heroImg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="text-white ">
        <h1 className="text-3xl text-center sm:text-5xl font-semibold font-['arial']">
          {t("title")}
        </h1>
        <p className="text-center font-semibold text-sm sm:text-lg">
          {/* with <span className="text-[#FF6F61] ">JobNest</span> finding a good
          Job now easy */}
          {t("subtitle")}
        </p>
        {!user ? (
          <div className="flex gap-3 w-fit mx-auto mt-5">
            <div
              className="min-w-[100px] w-fit py-1 px-4 text-lg font-semibold border-solid border-[#FF6F61] border-2 rounded-lg text-center bg-black bg-opacity-40 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              {t("navigation:login")}
            </div>
            <div
              className="min-w-[100px] w-fit py-1 px-4 text-lg font-semibold border-solid border-indigo-700 border-2 rounded-lg text-center bg-indigo-700 cursor-pointer"
              onClick={() => navigate("/signUp")}
            >
              {t("navigation:register")}
            </div>
          </div>
        ) : (
          <div className="flex gap-3 w-fit mx-auto mt-5">
            <div
              className="w-[125px] py-1 px-4 text-lg font-semibold border-solid border-[#FF6F61] border-2 rounded-lg text-center bg-black bg-opacity-40 cursor-pointer"
              onClick={() => navigate("/jobs")}
            >
              {t("navigation:jobs")}
            </div>
            <div
              className="w-[125px] py-1 px-4 text-lg font-semibold border-solid border-indigo-700 border-2 rounded-lg text-center bg-indigo-700 cursor-pointer"
              onClick={() => navigate("/internships")}
            >
              {t("navigation:internships")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
