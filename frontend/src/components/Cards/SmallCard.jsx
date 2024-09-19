import { useNavigate } from "react-router-dom";

function SmallCard({ title, icon, url }) {
  const navigate = useNavigate();

  return (
    <div
      className="min-w-[140px] max-w-[140px] h-[130px] flex flex-col gap-2 justify-center items-center rounded-lg text-gray-300 p-4 box-border cursor-pointer"
      style={{
        background:
          "linear-gradient(to top, rgb(32 9 46 / 83%) 0%, rgb(3 3 3 / 90%) 61%)",
      }}
      onClick={() => navigate(url)}
    >
      <div className="w-full flex justify-center text-3xl pb-2 border-solid border-b-2 border-[#FF6F61]">
        {icon}
      </div>
      <p className="text-center">{title}</p>
    </div>
  );
}

export default SmallCard;
