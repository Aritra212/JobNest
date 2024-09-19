import { CiFilter } from "react-icons/ci";
import JobCardLandscape from "../components/Cards/JobCardLandscape";
import { useEffect, useState } from "react";
import JobFilterCard from "../components/Cards/JobFilterCard";
import JobDetailsCard from "../components/Cards/JobDetailsCard";

function JobsLayout({ data = [], filter = "", value = "" }) {
  const locationList = ["Kolkata", "Delhi", "Bangaluru", "Hyderabad"];
  const profileList = ["IT", "Marketing", "Web Development"];
  const [filterCard, setFilterCard] = useState(false);
  const isInternship = data[0].stipend ? true : false;

  const [filters, setFilters] = useState({
    profile: "",
    location: "",
    workFromHome: false,
    partTime: false,
    salary: "",
  });
  const [filteredData, setFilteredData] = useState([]);

  const applyFilters = (fl) => {
    const filteredData = data?.filter((el) => {
      return Object.keys(fl).every((key) => {
        if (!fl[key]) return true;
        else if (key === "profile")
          return el.category.toLowerCase() === fl[key];
        else if (key === "location")
          return el.location.toLowerCase() === fl[key];
        else if (key === "workFromHome" && fl[key])
          return el.category.toLowerCase() == "work from home";
        else if (key === "partTime" && fl[key])
          return el.category.toLowerCase() == "part-time";
      });
    });
    console.log("filtered data: ", filteredData);
    setFilteredData(filteredData);
  };

  const [viewJob, setViewJob] = useState(-1);

  const inputHandler = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };
  useEffect(() => {
    if (filter && value) {
      // const [key, value] = filter.split(":");
      if (
        filter === "category" &&
        value.toLowerCase().trim() === "work from home"
      )
        // setFilters((prevFilters) => ({
        //   ...prevFilters,
        //   ["workFromHome"]: true,
        // }));
        inputHandler("workFromHome", true);
      else if (filter === "category" && value.toLowerCase() === "part time")
        setFilters((prevFilters) => ({
          ...prevFilters,
          ["partTime"]: true,
        }));

      console.log("useEffect", filter, "\n", value, filters);
    }
    // applyFilters(filters);
  }, [filter, value]);

  useEffect(() => {
    applyFilters(filters);
  }, [filters]);

  return (
    <div>
      {viewJob >= 0 ? (
        <JobDetailsCard
          data={filteredData[viewJob]}
          backfn={() => setViewJob(-1)}
        />
      ) : (
        <div className="w-11/12 sm:w-3/5 mx-auto my-5">
          <div className="lg:flex lg:gap-4">
            <div className="hidden lg:block">
              <JobFilterCard
                locationList={locationList}
                profileList={profileList}
                filters={filters}
                setFilters={setFilters}
              />
            </div>

            <div className="lg:w-[calc(100%-245px)]">
              {filteredData.length === 0 && (
                <h3 className="text-xl font-bold capitalize w-fit mx-auto">
                  No {isInternship ? "Internships" : "Jobs"} Found
                </h3>
              )}
              {filteredData.length > 0 && (
                <>
                  {/* <div
                    className="lg:hidden flex gap-1 items-center w-fit cursor-pointer  bg-blue-500 px-3 py-1 rounded-lg text-white font-semibold z-20"
                    onClick={() => setFilterCard((prev) => !prev)}
                  >
                    <CiFilter /> {!filterCard ? "Add filters" : "Close filters"}
                  </div> */}

                  <h3 className="text-xl font-bold capitalize w-full text-center">
                    {filteredData.length}{" "}
                    {isInternship ? "Internships" : "Jobs"} Found
                  </h3>
                  <div className="mt-3 overflow-y-scroll h-[600px]">
                    {filteredData?.map((item, index) => (
                      <JobCardLandscape
                        key={item.title + index}
                        item={{
                          title: item.title,
                          company: item.company,
                          salary: item.stipend || item.ctc,
                          loc: item.location,
                          time: item.duration || item.experience,
                        }}
                        showJob={() => setViewJob(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          {filterCard && (
            <div className="w-fit h-fit fixed top-32 mx-auto z-10 flex">
              <JobFilterCard
                locationList={locationList}
                profileList={profileList}
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default JobsLayout;
