import Input from "./Input";
import TextArea from "./TextArea";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useState } from "react";

function InternshipForm({ placedata, state, prevData, setdata, backfn }) {
  // Initialize pdata with prevData or default values
  const [pdata, setPdata] = useState({
    title: prevData?.title || "",
    company: prevData?.company || "",
    location: prevData?.location?.toString() || "",
    duration: prevData?.duration || "",
    category: prevData?.category?.toString() || "",
    aboutCompany: prevData?.aboutCompany || "",
    aboutInternship: prevData?.aboutInternship || "",
    perks: prevData?.perks?.toString() || "",
    openings: prevData?.openings || "",
    stipend: prevData?.stipend || "",
    startDate: prevData?.startDate || "",
  });

  const storeData = (data) => {
    let flag = false;
    for (const i in data) {
      if (!data[i]) {
        flag = true;
        break;
      }
    }
    if (flag) alert("Error!! Empty fields");
    else {
      setdata((prev) => ({
        ...prev,
        [state]: {
          title: data.title,
          company: data.company,
          location: data.location.split(",").map((el) => el.trim()),
          duration: data.duration,
          category: data.category.split(",").map((el) => el.trim()),
          aboutCompany: data.aboutCompany,
          aboutInternship: data.aboutInternship,
          perks: data.perks.split(",").map((el) => el.trim()),
          openings: data.openings,
          stipend: data.stipend,
          startDate: data.startDate,
        },
      }));
      backfn("");
    }
  };

  return (
    <div>
      <p className="mb-2 text-center">Language - {placedata?.language}</p>
      <Input
        label="Internship Title"
        placeholder={placedata.title}
        type="text"
        value={pdata.title}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
        required
      />
      <Input
        label="Company Name"
        placeholder={placedata.company}
        type="text"
        value={pdata.company}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            company: e.target.value,
          }))
        }
        required
      />
      <Input
        label="Location"
        placeholder={placedata.location}
        type="text"
        value={pdata.location}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            location: e.target.value,
          }))
        }
        required
      />
      <Input
        label="Duration"
        placeholder={placedata.duration}
        type="text"
        value={pdata.duration}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            duration: e.target.value,
          }))
        }
        required
      />
      <Input
        label="Category"
        placeholder={placedata.category}
        type="text"
        value={pdata.category}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            category: e.target.value,
          }))
        }
        required
      />
      <TextArea
        label="About the company"
        className="h-[300px]"
        value={pdata.aboutCompany}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            aboutCompany: e.target.value,
          }))
        }
        required
      />
      <TextArea
        label="About the internship"
        className="h-[300px]"
        value={pdata.aboutInternship}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            aboutInternship: e.target.value,
          }))
        }
        required
      />
      <Input
        label="Perks"
        placeholder={placedata.perks}
        type="text"
        value={pdata.perks}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            perks: e.target.value,
          }))
        }
      />
      <Input
        label="Number of openings"
        placeholder={placedata.openings}
        value={pdata.openings}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            openings: e.target.value,
          }))
        }
        type="text"
      />
      <Input
        label="Stipend"
        placeholder={placedata.stipend}
        type="text"
        value={pdata.stipend}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            stipend: e.target.value,
          }))
        }
      />
      <Input
        label="Start Date"
        placeholder={placedata.startDate}
        type="text"
        value={pdata.startDate}
        onChange={(e) =>
          setPdata((prev) => ({
            ...prev,
            startDate: e.target.value,
          }))
        }
      />

      <div
        className="w-fit flex mx-auto my-5 bg-indigo-700 text-white font-bold px-10 py-2 rounded-md cursor-pointer"
        onClick={() => storeData(pdata)}
      >
        Next
      </div>
      <div
        className="w-fit mx-auto bg-indigo-700 text-white px-7 py-2 flex gap-2 items-center font-bold rounded-md cursor-pointer"
        onClick={() => backfn("")}
      >
        <FaArrowLeftLong /> Back
      </div>
    </div>
  );
}

export default InternshipForm;
