// JobCard.jsx
/* eslint-disable react/prop-types */
import { BiWorld, BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";

function JobCard(props) {
  const item = props.data;
  let date = item.job_posted_at_datetime_utc;
  date = date !== undefined ? date.split("T") : "no date";
  return (
    <Link to="/job-info" state={{ page: item, pagination: props.pagination }}>
      <div className="w-full flex items-center h-fit gap-2 rounded-md bg-white mb-6 shadow p-2 sm:gap-4 hover:shadow-lg">
        <img
          src={
            item.employer_logo !== null
              ? item.employer_logo
              : "https://www.shutterstock.com/shutterstock/photos/1651914418/display_1500/stock-vector-hand-holding-megaphone-and-text-job-vacancy-1651914418.jpg"
          }
          alt="company img"
          className="h-28 w-32 border-1 rounded"
        />
        <div className="text-secondary flex flex-col justify-evenly w-full h-28 overflow-hidden">
          <h3 className="text-xs font-bold truncate">
            {item.employer_name ? item.employer_name : "Company name not found"}
          </h3>
          <h1 className="text-base truncate">
            {item.job_title ? item.job_title : "Job title not found"}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs w-full sm:flex-nowrap">
            <div className="border-2 rounded px-2 py-1 truncate border-secondary">
              {item.job_employment_type
                ? item.job_employment_type
                : "Job type not found"}
            </div>
            <div className="flex justify-between gap-1 flex-wrap sm:flex-nowrap sm:gap-4">
              <div className="text-gray-400 truncate flex items-center gap-2">
                <BiWorld className="inline" />
                <span>{item.job_country}</span>
              </div>
              <div className="text-gray-400 truncate justify-self-end flex items-center gap-2">
                <BiTimeFive className="inline" />
                <span>{date[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default JobCard;
