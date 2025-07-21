/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import JobCards from "../components/JobCards";
import { MdWorkOutline } from "react-icons/md";
import { BiWorld } from "react-icons/bi";

function MainPage() {
  let { state } = useLocation();

  let currPage = state == null ? 0 : state.pagination;
  const [query, setQuery] = useState("");
  const [fullTime, setFullTime] = useState(false);
  const [location, setLocation] = useState("");
  const [pagination, setPagination] = useState(currPage);

  const [actualQuery, setActualQuery] = useState("");
  const [actualLocation, setActualLocation] = useState("");

  let que = actualQuery === "" ? "Full Stack Developer" : actualQuery;
  let loc = actualLocation === "" ? "India" : actualLocation;

  const [apiData, setApiData] = useState();
  const [error, setError] = useState(null);

  const fetchData = (que, loc, fullTime) => {
    const options = {
      method: "GET",
      url: "https://jsearch.p.rapidapi.com/search",
      params: {
        query: `${que} in ${loc}`,
        page: "1",
        num_pages: "15",
        employment_types: fullTime ? "FULLTIME" : "PARTTIME",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_REACT_APP_API_SECRET_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => setApiData(res.data.data))
      .catch((err) => setError(err));
  };

  const HandleSubmit = (event) => {
    event.preventDefault();
    setActualQuery(query);
    setActualLocation(location);
    fetchData(query, location, fullTime);
  };

  const handleFullTime = () => {
    setFullTime((prev) => !prev);
  };

  const handleLocation = (e) => {
    setLocation("" + e.target.value);
  };

  useEffect(() => {
    fetchData(que, loc, fullTime);
  }, [que, loc, fullTime]);

  return (
   <div className="bg-background min-h-screen">
  <div className="font-Poppins max-w-full p-1 text-3xl md:p-2 cursor-pointer bg-blue-600 text-black px-2 rounded-md shadow-md flex justify-between items-center">
    <div className="text-left">
      <b>Jobs</b> Portal
    </div>
    <header className="font-Roboto flex items-center h-30 rounded-lg bg-center bg-cover justify-center md:w-3/4 lg:w-1/2 p-4 md:p-6">
      <div className="flex-1"></div>
      <form onSubmit={HandleSubmit} className="bg-white flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg p-6 shadow-md w-full sm:w-[calc(100%-5%)] relative ml-auto">
        <MdWorkOutline className="text-lg text-gray-500 sm:text-2xl" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Title, companies, expertise or benefits"
          className="text-black outline-none text-sm font-Roboto w-full px-2 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 transition-transform duration-200 transform hover:scale-105"
        />
        <input
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-blue-500 transition-colors duration-200 active:scale-95"
        />
      </form>
    </header>
  </div>

  {error && (
    <div className="bg-gray-200 text-sm rounded-lg text-gray-800 font-Poppins max-w-full p-4 mx-4 mb-4 md:p-6 md:mx-6 md:mb-6 shadow-md hover:bg-gray-300 transition-colors duration-200">
      <div>
        <div className="text-black font-bold">{error.code}</div>
        <p className="mt-2">{error.response.data.message}</p>
        <p className="mt-4 text-sm italic">
          Note: Due to exceeding the MONTHLY quota for requests, you cannot make more requests for the end of the month.
        </p>
        <p className="mt-2 font-bold underline">Currently, it shows demo API data.</p>
      </div>
    </div>
  )}

  <main className="flex flex-col w-full md:flex-row">
    <form className="p-4 py-8 font-Roboto text-secondary text-sm font-normal w-full md:pl-6 md:pr-0 md:w-1/3 sm:text-lg">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={fullTime}
          className="w-4 h-4 mr-2"
          onChange={handleFullTime}
        />
        <span>Full Time</span>
      </div>
      <label className="font-bold text-gray-600 bg-slate-200">Location</label>
      <div className="flex items-center bg- shadow-sm rounded p-4 my-4 gap-2 w-full">
        <BiWorld className="text-gray-500 text-lg" />
        <input
          type="text"
          className="text-sm outline-none grow w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
          placeholder="City, state, zip code or country"
          onChange={handleLocation}
        />
      </div>
      <div className="flex flex-col space-y-2">
        {["India", "London", "New York", "Berlin"].map((location) => (
          <label
            key={location}
            className="bg-slate-300 flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 mr-2"
          >
            <input
              type="radio"
              name="radio-location"
              className="w-4 h-4 mr-2"
              value={location}
              onClick={handleLocation}
            />
            <span className="text-gray-700">{location}</span>
          </label>
        ))}
      </div>
    </form>

    <section className="bg-gray-100 p-4 w-full md:w-2/3 md:p-8 shadow-sm">
      {apiData == null ? (
        <div className="flex flex-col justify-center items-center h-full">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-blue-600 animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <h3 className="text-gray-700 mt-4">Loading jobs...</h3>
        </div>
      ) : (
        apiData && <JobCards apiData={apiData} pagination={pagination} />
      )}
    </section>
  </main>
</div>
  );
}

export default MainPage;
