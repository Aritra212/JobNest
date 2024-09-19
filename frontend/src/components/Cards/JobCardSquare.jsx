import { CiLocationOn } from "react-icons/ci";
import { GrCurrency } from "react-icons/gr";
import {
  MdOutlineDateRange,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { useTranslation } from "react-i18next";

function JobCardSquare({ data, showJob }) {
  const { t } = useTranslation(["common"]);
  return (
    <div
      className={`min-h-[100px] min-w-[300px] my-3 border-solid border-gray-300 border-2 shadow-md rounded p-3 lg:p-5 flex flex-col gap-2`}
    >
      <div className=" flex  justify-between items-center">
        <div>
          <p className="sm:text-xl font-bold">{data.title}</p>
          <p className="text-xs sm:text-sm">{data.company}</p>
        </div>
      </div>
      <div className="pt-3 h-[54%] w-full flex gap-3 items-center flex-wrap text-xs lg:text-base">
        <p className="flex items-center gap-1 lg:gap-2">
          <CiLocationOn className="text-gray-500 text-xs lg:text-sm" />
          {data?.location.toString()}
        </p>
        <p className="flex items-center gap-1 lg:gap-2">
          <GrCurrency className="text-gray-500 text-xs lg:text-sm" />
          {data.stipend || data.ctc}
        </p>
        {(data.duration || data.experience) && (
          <p className="flex items-center gap-1 lg:gap-2">
            <MdOutlineDateRange className="text-gray-500 text-xs lg:text-sm" />
            {data.duration || data.experience}
          </p>
        )}
      </div>
      <div>
        <p
          className="text-blue-600 flex items-center text-xs lg:text-sm cursor-pointer"
          onClick={showJob}
        >
          {t("viewDetails")}
          <MdOutlineKeyboardArrowRight className="text-sm mt-1" />
        </p>
      </div>
    </div>
  );
}

export default JobCardSquare;
