import { useState } from "react";
import Input from "../AdminComponents/Input";
import axios from "axios";
import conf from "../../conf/conf";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function ApplyCard({ data, backfn }) {
  const { t } = useTranslation(["user", "common"]);
  const user = useSelector((state) =>
    state.auth.status ? state.auth.userData : null
  );
  const [applicationData, setApplicationData] = useState({
    userId: user?.id || "",
    jobId: data._id || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    type: data.stipend ? "internship" : "job",
  });
  const handleApplication = async () => {
    let flag = false;
    if (!user) {
      alert("Login before apply");
    } else {
      console.log(applicationData);
      for (const i in applicationData) {
        if (!applicationData[i]) {
          flag = true;
          break;
        }
      }
      if (flag)
        alert("All fields be filled before apply for the Internship/Job");
      else if (!user) alert("User ID not found Login before apply");
      else {
        setApplicationData((prev) => ({
          ...prev,
          jobId: data._id,
          userId: user.id,
        }));

        axios
          .post(`${conf.backendURL}/application/apply`, applicationData)
          .then((res) => {
            console.log(res);
            alert(res.data.message);
            backfn(false);
          })
          .catch((error) => {
            console.log(error);
            alert("Application Post Error " + error.response.data.message);
          });
      }
    }
  };
  return (
    <div className="w-full sm:w-[500px] mx-auto">
      <h1 className="font-bold text-xl">
        {t("apply.title")} {data.title}
      </h1>
      <p className="text-xs text-gray-500">
        {t("apply.p1")} - {data._id}
      </p>

      <div className="space-y-3 my-3">
        <Input
          label={t("labels.name")}
          type="text"
          value={applicationData.name}
          onChange={(e) =>
            setApplicationData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          required
        />

        <Input
          label={t("labels.phone")}
          type="text"
          value={applicationData.phone}
          onChange={(e) =>
            setApplicationData((prev) => ({
              ...prev,
              phone: e.target.value,
            }))
          }
          required
        />
        <Input
          label={t("labels.email")}
          type="email"
          value={applicationData.email}
          onChange={(e) =>
            setApplicationData((prev) => ({
              ...prev,
              email: e.target.value,
            }))
          }
          required
        />

        {/* <div>
          <label>
            Attached resume <br />
            <input type="file" />
          </label>
        </div> */}
      </div>

      <div
        className="w-fit flex mx-auto my-3 bg-indigo-700 text-white font-bold px-10 py-2 rounded-md cursor-pointer"
        onClick={handleApplication}
      >
        {t("common:apply")}
      </div>

      <div
        className="w-fit flex mx-auto my-3 bg-indigo-700 text-white font-bold px-10 py-2 rounded-md cursor-pointer"
        onClick={() => backfn(false)}
      >
        {t("common:cancel")}
      </div>
    </div>
  );
}

export default ApplyCard;
