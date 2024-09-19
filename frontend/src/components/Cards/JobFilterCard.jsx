import { CiFilter } from "react-icons/ci";

function JobFilterCard({ locationList, profileList, filters, setFilters }) {
  const inputHandler = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className=" h-fit flex flex-col gap-3 border-solid border-gray-300 border-[2px] p-5 rounded-lg lg:mt-12 w-[263px] bg-white">
      <p className="flex items-center gap-2 font-semibold w-fit mx-auto">
        <CiFilter className="text-blue-600 text-lg" /> Filters
      </p>
      <label className="text-sm">
        Profile <br />
        <input
          type="text"
          list="profiles"
          name="profile"
          placeholder="e.g. Marketing"
          className="border-solid border-gray-300 border-[2px] rounded-md px-3 pt-[2px] pb-[4px] text-sm h-fit w-[220px] mt-1"
          onChange={(e) => {
            inputHandler(e.target.name, e.target.value);
          }}
        />
        <datalist id="profiles" className="bg-gray-500">
          {profileList.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </label>

      <label className="text-sm">
        Location <br />
        <input
          type="text"
          list="locations"
          name="location"
          placeholder="e.g. Kolkata"
          className="border-solid border-gray-300 border-[2px] rounded-md px-3 pt-[2px] pb-[4px] text-sm h-fit w-[220px] mt-1"
          onChange={(e) => {
            inputHandler(e.target.name, e.target.value);
          }}
        />
        <datalist id="locations" className="bg-gray-500">
          {locationList.map((item) => (
            <option key={item} value={item} />
          ))}
        </datalist>
      </label>

      <label className="text-sm">
        <input
          type="checkbox"
          name="workFromHome"
          className="mr-2"
          checked={filters.workFromHome}
          onChange={(e) => {
            inputHandler(e.target.name, !filters.workFromHome);
          }}
        />
        Work Form Home
      </label>

      <label className="text-sm">
        <input
          type="checkbox"
          name="partTime"
          className="mr-2"
          checked={filters.partTime}
          onChange={(e) => {
            inputHandler(e.target.name, !filters.partTime);
          }}
        />
        Part-time
      </label>

      <label className="text-xs">
        Desired minimum monthly CTC <br />
        <input
          type="range"
          min="0"
          max="10"
          step="2"
          className="w-[220px] my-1"
        />
        <p className="flex justify-between">
          <span>0</span>
          <span>2k</span>
          <span>4k</span>
          <span>6k</span>
          <span>8k</span>
          <span>10k</span>
        </p>
      </label>

      <p className="text-blue-500 text-sm mt-2">Clear all</p>
    </div>
  );
}

export default JobFilterCard;
