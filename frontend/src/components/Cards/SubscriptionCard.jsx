import { useTranslation } from "react-i18next";
import { FaIndianRupeeSign } from "react-icons/fa6";

function SubscriptionCard({ title, category, amount, features, btnFun }) {
  const { t } = useTranslation(["common"]);

  return (
    <div className="min-w-[250px] h-fit shadow-lg px-3 py-5 box-border border-solid border-[3px] border-violet-400 rounded-xl">
      <div
        className={`text-2xl font-bold ${
          (category === "Free" && "text-green-600") ||
          (category === "Bronze" && "text-amber-700") ||
          (category === "Silver" && "text-gray-500") ||
          (category === "Gold" && "text-yellow-600")
        } w-fit mx-auto my-2`}
      >
        {title}
      </div>
      <div className="text-3xl font-bold flex items-center gap-1 my-7">
        <FaIndianRupeeSign className="text-lg" />
        <p>
          {amount}
          <span className="text-sm text-gray-500">/{t("month")}</span>
        </p>
      </div>
      <div className="my-5 min-h-[80px]">
        <ul className="list-disc mx-5 text-sm text-gray-600 h-fit">
          {features?.map((el) => (
            <li key={el}>{el}</li>
          ))}
        </ul>
      </div>
      <div
        onClick={btnFun}
        className="w-11/12 py-2 text-center cursor-pointer border-solid border-2 border-green-700 rounded-xl hover:bg-green-700 font-bold hover:text-white"
      >
        {t("getplan")}
      </div>
    </div>
  );
}

export default SubscriptionCard;
