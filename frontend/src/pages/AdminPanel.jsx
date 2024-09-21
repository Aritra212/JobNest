import { useState } from "react";
import { LuClipboardEdit } from "react-icons/lu";
import { TbTableShortcut } from "react-icons/tb";
import PostInternship from "../components/AdminComponents/PostInternship";
import PostJobs from "../components/AdminComponents/PostJobs";
import ViewApplications from "../components/AdminComponents/ViewApplications";
import { useSelector } from "react-redux";

// import PostJob from "../components/PostJob";

function AdminPanel() {
  const [activeState, setActiveState] = useState("");
  const isAdmin = useSelector((state) =>
    state.auth.status ? state.auth.userData.isAdmin : null
  );

  return !isAdmin ? (
    <div className="w-full min-h-[calc(100vh-80px)] ">
      {!activeState && (
        <div className="w-3/5 h-[calc(100vh-80px)]  mx-auto flex flex-col justify-center box-border">
          <div className="flex flex-wrap h-fit justify-evenly items-center">
            <div
              className="w-fit flex flex-col items-center cursor-pointer my-2"
              onClick={() => setActiveState("postInternship")}
            >
              <div className="w-20 h-20 flex justify-center items-center bg-indigo-700 text-white text-2xl font-extrabold rounded-md">
                <LuClipboardEdit />
              </div>
              <p className="text-center text-xl font-bold text-gray-600">
                Post An Internship
              </p>
            </div>
            <div
              className="w-fit flex flex-col items-center cursor-pointer my-2"
              onClick={() => setActiveState("postJob")}
            >
              <div className="w-20 h-20 flex justify-center items-center bg-indigo-700 text-white text-2xl font-extrabold rounded-md">
                <LuClipboardEdit />
              </div>
              <p className="text-center text-xl font-bold text-gray-600">
                Post A Job
              </p>
            </div>
            <div
              className="w-fit flex flex-col items-center cursor-pointer my-2"
              onClick={() => setActiveState("viewApplications")}
            >
              <div className="w-20 h-20 flex justify-center items-center bg-indigo-700 text-white text-2xl font-extrabold rounded-md">
                <TbTableShortcut />
              </div>
              <p className="text-center text-xl font-bold text-gray-600">
                View Applicatons
              </p>
            </div>
          </div>
        </div>
      )}

      {activeState == "postInternship" && (
        <div className="w-11/12 sm:w-4/5 lg:w-1/2 mx-auto my-10 p-7 box-border bg-gray-100 rounded-md">
          <h1 className="w-full text-center text-2xl font-bold">
            Post an internship
          </h1>
          <PostInternship backfn={() => setActiveState("")} />
        </div>
      )}
      {activeState == "postJob" && (
        <div className="w-1/2 mx-auto my-10 p-7 box-border bg-gray-100 rounded-md">
          <h1 className="w-full text-center text-2xl font-bold">Post a job</h1>
          <PostJobs backfn={() => setActiveState("")} />
        </div>
      )}

      {activeState == "viewApplications" && (
        <div className="w-4/5 md:w-11/12 mx-auto my-10 p-7 box-border">
          <h1 className="w-full text-center text-2xl font-bold">
            View Applications
          </h1>
          <ViewApplications backfn={() => setActiveState("")} />
        </div>
      )}
    </div>
  ) : (
    <p>You can&apos;t access this page without admin verification</p>
  );
}

export default AdminPanel;
