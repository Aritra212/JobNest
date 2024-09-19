import axios from "axios";
import { useEffect, useState } from "react";
import conf from "../../conf/conf";
import { FaArrowLeftLong } from "react-icons/fa6";

function ViewApplications({ backfn }) {
  const [applications, setAppllications] = useState([]);

  useEffect(() => {
    if (!applications.length) {
      axios
        .get(`${conf.backendURL}/application/`)
        .then((res) => {
          alert(res.data.message);
          setAppllications(res.data.data);
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.error(error);
        });
    }
  }, [applications]);

  return (
    <div>
      {applications ? (
        <div>
          <p
            className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 my-3 rounded-lg cursor-pointer"
            onClick={backfn}
          >
            <FaArrowLeftLong /> Back
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {applications?.map((el) => (
              <div
                key={el._id}
                className="w-[300px] p-2 shadow-lg border-solid border-2 border-gray-400 text-sm rounded-lg"
              >
                <p>Job id - {el.jobId}</p>
                <p>Job type - {el.category}</p>
                <p>Application id - {el._id}</p>
                <p>Applicient Name - {el.name}</p>
                <p>Contact - {el.phone || el.email}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-center font-semibold">No Data To Show</p>
          <p
            className="flex gap-1 items-center text-blue-600 shadow-md w-fit px-3 py-1 mx-auto my-3 rounded-lg cursor-pointer"
            onClick={backfn}
          >
            <FaArrowLeftLong /> Back
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewApplications;
