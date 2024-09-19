import { GrStatusGood } from "react-icons/gr";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";
import InternshipForm from "./InternshipForm";
import axios from "axios";
import conf from "../../conf/conf";

function PostInternship({ backfn }) {
  // const [error, setError] = useState("");
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
      duration: "e.g. 6 months",
      category: "e.g. Work From Home, Big Brands",
      perks: "e.g. Certificate, Job offer",
      stipend: "e.g. 2000-3000 Rs/month",
      startDate: "e.g. Immediate",
      openings: "e.g. 10",
    },
    hi: {
      language: "हिंदी",
      title: "उदाहरण: ग्राफ़िक्स डिज़ाइन",
      company: "उदाहरण: एलसीडी लिमिटेड",
      location: "उदाहरण: भारत, कोलकाता, दिल्ली",
      duration: "उदाहरण: 6 महीने",
      category: "उदाहरण: घर से काम, बड़े ब्रांड",
      perks: "उदाहरण: प्रमाणपत्र, नौकरी की पेशकश",
      stipend: "उदाहरण: 2000-3000 रुपये प्रति माह",
      startDate: "उदाहरण: तुरंत",
      openings: "उदाहरण: 10",
    },
    fr: {
      language: "Français",
      title: "par ex. Conception graphique",
      company: "par ex. LCD ltée.",
      location: "par ex. Inde, Calcutta, Delhi",
      duration: "par ex. 6 mois",
      category: "par ex. Travail à domicile, grandes marques",
      perks: "par ex. Certificat, Offre d'emploi",
      stipend: "par ex. 2000-3000 Rs/mois",
      startDate: "par ex. Immédiate",
      openings: "par ex. 10",
    },
    sp: {
      language: "Española",
      title: "p.ej Diseño Gráfico",
      company: "p.ej LCD ltd.",
      location: "p.ej India, Calcuta, Delhi",
      duration: "p.ej 6 meses",
      category: "p.ej Trabajar desde casa, grandes marcas",
      perks: "p.ej Certificado, oferta de trabajo",
      stipend: "p.ej 2000-3000 rupias/mes",
      startDate: "p.ej Inmediata",
      openings: "p.ej 10",
    },
    po: {
      language: "Português",
      title: "por exemplo Design Gráfico",
      company: "por exemplo LCD Ltda.",
      location: "por exemplo Índia, Calcutá, Delhi",
      duration: "por exemplo 6 meses",
      category: "por exemplo Trabalhe em casa, grandes marcas",
      perks: "por exemplo Certificado, oferta de emprego",
      stipend: "por exemplo 2000-3000 rupias/mês",
      startDate: "por exemplo Imediata",
      openings: "por exemplo 10",
    },
    ch: {
      language: "中国人",
      title: "例如 平面设计",
      company: "例如 液晶显示器有限公司",
      location: "例如 印度, 加尔各答, 德里",
      duration: "例如 6个月",
      category: "例如 在家工作，大品牌",
      perks: "例如 证书、工作机会",
      stipend: "例如 2000-3000 卢比/月",
      startDate: "例如 即时",
      openings: "例如 10",
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
    if (flag) alert("All language should be filled before post the Internship");
    else {
      axios
        .post(`${conf.backendURL}/internship/post`, langFill)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          alert("Internship Post Error", error.data.massage);
        });
    }
  };
  return (
    <>
      {console.log(langFill)}
      {activateForm === "" && (
        <div className="space-y-3 my-3">
          {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
          <p className="text-center text-sm">
            To post a internship fill all languge
          </p>
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
          <InternshipForm
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

export default PostInternship;
