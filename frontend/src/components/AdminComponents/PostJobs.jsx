import { GrStatusGood } from "react-icons/gr";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import JobForm from "./JobForm";
import axios from "axios";
import conf from "../../conf/conf";

function PostJobs({ backfn }) {
  const [langFill, setlangFill] = useState({
    en: null,
    hi: null,
    fr: null,
    po: null,
    ch: null,
    sp: null,
  });
  const [activateForm, setActivateForm] = useState("");
  const placeholders = {
    en: {
      language: "English",
      title: "e.g Graphics Design",
      company: "e.g. LCD ltd.",
      location: "e.g. India, Kolkata, Delhi",
      experience: "e.g. 0-1 years",
      category: "e.g. Work From Home, Big Brands",
      perks: "e.g. Flexible work hours ,Informal dress code",
      ctc: "e.g. 20000-30000 Rs/month",
      startDate: "e.g. oct 5",
      openings: "e.g. 10",
      categories: [
        "Work From Home",
        "Big Brands",
        "Designing",
        "Software Development",
      ],
    },
    hi: {
      language: "हिंदी",
      title: "उदाहरण: ग्राफ़िक्स डिज़ाइन",
      company: "उदाहरण: एलसीडी लिमिटेड",
      location: "उदाहरण: भारत, कोलकाता, दिल्ली",
      experience: "उदाहरण: 0-1 साल",
      category: "उदाहरण: वर्क फ्रॉम होम, बड़ी ब्रांड्स",
      perks: "उदाहरण: लचीले काम के घंटे, अनौपचारिक ड्रेस कोड",
      ctc: "उदाहरण: 20000-30000 रुपये प्रति माह",
      startDate: "उदाहरण: 05/10/2024",
      openings: "उदाहरण: 10",
      categories: [
        "बड़ी ब्रांड्स",
        "डिजाइनिंग",
        "वर्क फ्रॉम होम",
        "सॉफ्टवेयर विकास",
      ],
    },
    fr: {
      language: "Français",
      title: "par ex. Conception graphique",
      company: "par ex. LCD ltée.",
      location: "par ex. Inde, Calcutta, Delhi",
      experience: "par ex. 0-1 années",
      category: "par ex. Télétravail, Grandes Marques",
      perks:
        "par ex. Horaires de travail flexibles, code vestimentaire informel",
      ctc: "par ex. 20000-30000 Rs/mois",
      startDate: "par ex. 05/10/2024",
      openings: "par ex. 10",
      categories: [
        "Grandes Marques",
        "Conception",
        "Télétravail",
        "Développement de logiciels",
      ],
    },
    sp: {
      language: "Española",
      title: "p.ej Diseño Gráfico",
      company: "p.ej LCD ltd.",
      location: "p.ej India, Calcuta, Delhi",
      experience: "p.ej 0-1 años",
      category: "p.ej Trabajo desde casa, Grandes Marcas",
      perks:
        "p.ej Horarios de trabajo flexibles, código de vestimenta informal.",
      ctc: "p.ej 20000-30000 rupias/mes",
      startDate: "p.ej 05/10/2024",
      openings: "p.ej 10",
      categories: [
        "Grandes Marcas",
        "Diseño",
        "Trabajo desde casa",
        "Desarrollo de software",
      ],
    },
    po: {
      language: "Português",
      title: "por exemplo Design Gráfico",
      company: "por exemplo LCD Ltda.",
      location: "por exemplo Índia, Calcutá, Delhi",
      experience: "por exemplo 0-1 anos",
      category: "por exemplo Trabalho remoto, Grandes Marcas",
      perks: "por Horário de trabalho flexível, código de vestimenta informal",
      ctc: "por exemplo 20000-30000 rupias/mês",
      startDate: "por exemplo 05/10/2024",
      openings: "por exemplo 10",
      categories: [
        "Grandes Marcas",
        "Design",
        "Trabalho remoto",
        "Desenvolvimento de software",
      ],
    },
    ch: {
      language: "中国人",
      title: "例如 平面设计",
      company: "例如 液晶显示器有限公司",
      location: "例如 印度, 加尔各答, 德里",
      experience: "例如 0-1年",
      category: "例如 软件开发，大品牌",
      perks: "例如 证书、灵活的工作时间，非正式的着装要求",
      ctc: "例如 20000-30000 卢比/月",
      startDate: "例如 05/10/2024",
      openings: "例如 10",
      categories: ["大品牌", "设计", "居家办公", "软件开发"],
    },
  };

  const handleSubmit = async () => {
    let flag = false;
    for (const i in langFill) {
      if (!langFill[i]) {
        flag = true;
        break;
      }
    }
    if (flag) alert("All language should be filled before post the Job");
    else {
      axios
        .post(`${conf.backendURL}/job/post`, langFill)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          alert("Job Post Error", error.data.massage);
        });
    }
  };
  return (
    <>
      {console.log(langFill)}
      {activateForm === "" && (
        <div className="space-y-3 my-3">
          {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
          <p className="text-center text-sm">To post a job fill all languge</p>
          <div
            className="w-full flex gap-4 items-center bg-white p-3 rounded-lg cursor-pointer"
            onClick={() => setActivateForm("en")}
          >
            <p>
              Language - <span>English</span>
            </p>
            {langFill.en && <GrStatusGood className="text-green-600" />}
          </div>
          <div
            className="w-full flex gap-4 items-center bg-white p-3 rounded-lg cursor-pointer"
            onClick={() => setActivateForm("hi")}
          >
            <p>
              Language - <span>Hindi</span>
            </p>
            {langFill.hi && <GrStatusGood className="text-green-600" />}
          </div>
          <div
            className="w-full flex gap-4 items-center bg-white p-3 rounded-lg cursor-pointer"
            onClick={() => setActivateForm("fr")}
          >
            <p>
              Language - <span>French</span>
            </p>
            {langFill.fr && <GrStatusGood className="text-green-600" />}
          </div>
          <div
            className="w-full flex gap-4 items-center bg-white p-3 rounded-lg cursor-pointer"
            onClick={() => setActivateForm("sp")}
          >
            <p>
              Language - <span>Spanish</span>
            </p>
            {langFill.sp && <GrStatusGood className="text-green-600" />}
          </div>
          <div
            className="w-full flex gap-4 items-center bg-white p-3 rounded-lg cursor-pointer"
            onClick={() => setActivateForm("po")}
          >
            <p>
              Language - <span>Portugese</span>
            </p>
            {langFill.po && <GrStatusGood className="text-green-600" />}
          </div>
          <div
            className="w-full flex gap-4 items-center bg-white p-3 rounded-lg cursor-pointer"
            onClick={() => setActivateForm("ch")}
          >
            <p>
              Language - <span>Chinese</span>
            </p>
            {langFill.ch && <GrStatusGood className="text-green-600" />}
          </div>

          <div
            className="w-fit flex mx-auto bg-indigo-700 text-white font-bold px-10 py-2 rounded-md cursor-pointer"
            onClick={handleSubmit}
          >
            Post
          </div>
          <div
            className="w-fit mx-auto font-bold bg-indigo-700 text-white px-7 py-2 flex gap-2 items-center rounded-md cursor-pointer"
            onClick={backfn}
          >
            <FaArrowLeftLong /> Back
          </div>
        </div>
      )}
      {activateForm != "" && (
        <>
          {console.log(placeholders[activateForm])}
          <JobForm
            placedata={placeholders[activateForm]}
            state={activateForm}
            prevData={langFill[activateForm]}
            setdata={setlangFill}
            backfn={setActivateForm}
          />
        </>
      )}
    </>
  );
}

export default PostJobs;
