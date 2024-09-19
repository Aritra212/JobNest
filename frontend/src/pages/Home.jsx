import Hero from "../components/HomeComponents/Hero";
import InternCards from "../components/HomeComponents/InternCards";
import JobCards from "../components/HomeComponents/JobCards";
import JobDetailsCard from "../components/Cards/JobDetailsCard";
import { useState } from "react";

function Home() {
  const [viewJob, setViewJob] = useState(-1);
  const [detailData, setDetailData] = useState(null);
  return (
    <div className="w-full">
      {viewJob >= 0 ? (
        <JobDetailsCard data={detailData} backfn={() => setViewJob(-1)} />
      ) : (
        <>
          <Hero />
          <InternCards setDetailData={setDetailData} setViewJob={setViewJob} />
          <JobCards setDetailData={setDetailData} setViewJob={setViewJob} />
        </>
      )}
    </div>
  );
}

export default Home;
