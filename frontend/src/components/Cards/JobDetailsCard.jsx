import { CiLocationOn } from "react-icons/ci";
import { GrCurrency } from "react-icons/gr";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { useEffect, useState } from "react";
import ApplyCard from "./ApplyCard";
import axios from "axios";
import conf from "../../conf/conf";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function JobDetailsCard({ data, backfn }) {
  const [apply, setapply] = useState(false);
  const [applied, setApplied] = useState(false);
  const userId = useSelector((state) =>
    state.auth.status ? state.auth.userData.id : null
  );
  const { t } = useTranslation(["common", "cards"]);

  useEffect(() => {
    if (userId)
      axios
        .get(`${conf.backendURL}/application/${data._id}/${userId}`)
        .then((res) => res.data.success && setApplied(true));
  }, [userId, data._id, apply]);

  return (
    <div className="w-11/12 md:w-4/5 mx-auto py-5">
      {apply ? (
        <ApplyCard data={data} backfn={setapply} />
      ) : (
        <div>
          <p
            className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 rounded-lg cursor-pointer"
            onClick={backfn}
          >
            <FaArrowLeftLong /> {t("back")}
          </p>

          <h1 className="text-center text-3xl font-bold mt-3">{data.title}</h1>
          <p className="text-center mb-2">{data.company}</p>

          <div className="flex gap-3 flex-wrap">
            <p className="flex items-center gap-1 lg:gap-2">
              <CiLocationOn className="text-gray-500 text-xs lg:text-sm" />
              {data.location}
            </p>
            <p className="flex items-center gap-1 lg:gap-2">
              <GrCurrency className="text-gray-500 text-xs lg:text-sm" />
              {data.ctc || data.stipend}
            </p>
            <p className="flex items-center gap-1 lg:gap-2">
              <MdOutlineDateRange className="text-gray-500 text-xs lg:text-sm" />
              {data.duration || data.experience}
            </p>
          </div>

          <div className="my-2">
            <h2 className="font-bold text-lg">
              {data.stipend ? t("cards:desc.intern") : t("cards:desc.job")}
            </h2>
            {data?.description.split("\n").map((el, idx) => (
              <p key={idx}>{el}</p>
            ))}
          </div>

          <div className="my-2">
            <h2 className="font-bold text-lg">{t("cards:perks")}</h2>
            <div className="flex flex-wrap gap-2">
              {data.perks.map((el, idx) => (
                <p key={idx} className="w-fit bg-gray-300 p-1 rounded text-sm ">
                  {el}
                </p>
              ))}
            </div>
          </div>

          <div className="my-2">
            <h2 className="font-bold text-lg">{t("cards:openings")}</h2>
            <p>{data.openings}</p>
          </div>

          <div className="my-2">
            <h2 className="font-bold text-lg">{t("cards:sdate")}</h2>
            <p>{data.startDate}</p>
          </div>

          <div className="my-2">
            <h2 className="font-bold text-lg">{t("cards:aCompany")}</h2>
            <p>{data.aboutCompany}</p>
          </div>

          {applied ? (
            <div className="w-fit flex mx-auto my-3 bg-gray-500 text-white font-bold px-10 py-2 rounded-md">
              {t("applied")}
            </div>
          ) : (
            <div
              className="w-fit flex mx-auto my-3 bg-indigo-700 text-white font-bold px-10 py-2 rounded-md cursor-pointer"
              onClick={() => setapply(true)}
            >
              {t("apply")}
            </div>
          )}

          <div
            className="w-fit mx-auto font-bold bg-indigo-700 text-white px-7 py-2 flex gap-2 items-center rounded-md cursor-pointer"
            onClick={backfn}
          >
            <FaArrowLeftLong /> {t("back")}
          </div>
        </div>
      )}
    </div>
  );
}

export default JobDetailsCard;
