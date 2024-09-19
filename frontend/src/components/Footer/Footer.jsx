import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation(["navigation"]);
  return (
    <div className="h-[200px] bg-black text-white flex flex-col items-center justify-center text-center">
      <p>
        {t("footer")} <br /> &copy;2024
      </p>
    </div>
  );
}

export default Footer;
