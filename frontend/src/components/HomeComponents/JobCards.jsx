import axios from "axios";
import { useEffect, useState } from "react";
import { FaLaptopCode } from "react-icons/fa";
import conf from "../../conf/conf";
import JobCardSquare from "../Cards/JobCardSquare";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function JobCards({ setViewJob, setDetailData }) {
  const { t } = useTranslation(["home"]);
  const jobCardDetails = [
    {
      title: t("categories.bigBrands"),
      icon: <FaLaptopCode />,
    },
    {
      title: t("categories.designing"),
      icon: <FaLaptopCode />,
    },
    {
      title: t("categories.wfh"),
      icon: <FaLaptopCode />,
    },
    {
      title: t("categories.software"),
      icon: <FaLaptopCode />,
    },
  ];

  const [data, setData] = useState([]);
  const [activeCat, setActiveCat] = useState("");
  const lang = useSelector((state) => state.lang.language || "en");

  const fetchJobs = async (category) => {
    setData([]);
    axios
      .get(`${conf.backendURL}/job/category/${category}/${lang}`)
      .then((res) => setData(res.data.data));
    setActiveCat(category);
  };

  useEffect(() => {
    fetchJobs(jobCardDetails[0].title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <div className="w-11/12 sm:w-4/5 mx-auto my-4">
      <p className="text-xl font-bold mb-4 text-gray-700">
        {t("cardHeadings.jobCat")}
      </p>
      <div className="flex gap-2 flex-wrap h-fit">
        {jobCardDetails?.map((el) => (
          <p
            key={el.title}
            className={`border-solid border-2 border-indigo-700 px-3 py-1 font-semibold rounded-2xl w-fit hover:text-white hover:bg-indigo-700 cursor-pointer ${
              activeCat === el.title && "bg-indigo-700 text-white"
            }`}
            onClick={() => fetchJobs(el.title)}
          >
            {el.title}
          </p>
        ))}
      </div>
      <div className="flex gap-3 overflow-x-scroll">
        {data?.map((el, index) => (
          <JobCardSquare
            data={el}
            key={el._id}
            showJob={() => {
              setViewJob(index);
              setDetailData(el);
            }}
          />
        ))}
        {data.length <= 0 && (
          <p className="font-bold my-5 text-gray-600">{t("messages.nfd")}</p>
        )}
      </div>
    </div>
  );
}

export default JobCards;
