// import { JobData } from "../assets/Data/JobsDataAvl";
import { useEffect, useState } from "react";
import JobsLayout from "../Layouts/JobsLayout.jsx";
import axios from "axios";
import conf from "../conf/conf.js";
import { useTranslation } from "react-i18next";

function Internships() {
  const [data, setData] = useState(null);
  const { i18n } = useTranslation(["navigation"]);

  useEffect(() => {
    axios
      .get(`${conf.backendURL}/internship/${i18n.language}`)
      .then((res) => setData(res.data.data))
      .catch((error) => {
        console.log(error);
        alert(error.data.message);
      });
  }, [i18n]);

  return (
    <div className="w-full">
      {data ? <JobsLayout data={data} /> : "No data found"}
    </div>
  );
}

export default Internships;
