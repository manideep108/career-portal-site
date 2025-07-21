import { Link, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BiWorld, BiTimeFive } from "react-icons/bi";

function JobInfoPage() {
  let { state } = useLocation();

  if (!state || !state.page) {
    return <div>Loading...</div>;
  }

  const dateTimeExp = new Date(state.page.job_offer_expiration_timestamp * 1000);
  const dateTimePosted = new Date(state.page.job_posted_at_timestamp * 1000);
  let des = state.page.job_description;
  des = des.replaceAll("\n\n", "<br/>").replaceAll("•", "-");
  const keys = Object.keys(state.page.job_highlights);

  return (
    <div className="bg-background min-h-screen text-secondary">
      <div className="bg-blue-200 font-Poppins max-w-full p-4 text-2xl md:p-8 cursor-pointer text-black top-0 bg-background">
        <Link
            to="/">
          <b>Jobs</b> Portal
          </Link>
      </div>
      <main className="bg-blue-50 flex flex-wrap md:flex-nowrap ">
        <aside className="px-4 mb-4 md:px-8 w-full h-fit md:max-w-xs bg-background">
          
          <div>
            <h3 className="text-[#37373a] uppercase text-base font-bold mb-4">
              <u>How to Apply</u>
            </h3>
            <div className="mb-1">
              <b>Company website:</b>{" "}
              {state.page.employer_website ? (
                <a
                  href={state.page.employer_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  {state.page.employer_name}
                </a>
              ) : (
                <span className="text-gray-500 cursor-not-allowed">
                  {state.page.employer_name}
                </span>
              )}
            </div>
            <div className="mb-1"><b>Salary:</b> As per the Industry Standard</div>
            <div className="mb-1">
              <b>Publisher:</b> {state.page.job_publisher || "NA"}
            </div>
            <div className="mb-4">
              <b>Apply Before:</b>{" "}
              <span>
                {dateTimeExp.toDateString()}
              </span>
            </div>
            <a
              href={state.page.job_apply_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-blue-600 mb-4 text-white px-4 py-2 text-base rounded-md flex-none sm:px-4 sm:py-2 hover:bg-slate-700">
                Apply Now
              </button>
            </a>
            <Link
            to="/"
            state={{ pagination: state.pagination }}
            className="flex items-center gap-4 mb-4"
          >
          <span className="bg-blue-600 mb-4 text-white px-4 py-2 text-base rounded-md flex-none sm:px-4 sm:py-2 hover:bg-slate-700">&larr; Back to search </span>
          </Link>
          </div>
        </aside>
        <section className="w-full md:w-3/4 px-4 md:px-8">
          <div className="flex flex-col justify-start items-start gap-2 sm:flex-row sm:items-center sm:gap-4 mb-2">
            <h1 className="text-2xl font-bold">{state.page.job_title}</h1>
            <div className="border-2 text-xs rounded px-2 py-1 truncate border-secondary max-w-fit">
              {state.page.job_employment_type}
            </div>
          </div>
          <div className="text-gray-400 truncate text-xs justify-self-end mb-8 gap-2 flex items-center">
            <BiTimeFive className="inline" />
            <span>{dateTimePosted.toDateString()}</span>
          </div>

          <div className="flex gap-4 flex-wrap mb-8">
            <img
              src={
                state.page.employer_logo !== null
                  ? state.page.employer_logo
                  : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
              }
              alt="company img"
              className="h-16 w-16 border-1 rounded-md"
            />
            <div className="flex flex-col justify-around">
              <h3 className="text-base font-bold truncate">
                {state.page.employer_name}
              </h3>
              <div className="text-gray-400 text-xs truncate flex items-center gap-2">
                <BiWorld className="inline" />
                <span>{state.page.job_country}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-8">
              <h3 className="text-base font-bold truncate mb-4">
                Job Info:
              </h3>
              <hr className="mb-4 border-secondary" />
              <div className="font-Poppins whitespace-break-spaces">
                {parse(des)}
              </div>
            </div>
            {keys.map((item, i) => (
              <div key={i} className="mb-8">
                <h3 className="text-base font-bold truncate mb-4">
                  {item}:
                </h3>
                <hr className="mb-4 border-secondary" />
                <ul className="list-disc ml-4">
                  {state.page.job_highlights[item].map((pro, j) => (
                    <li key={j} className="mb-2">
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default JobInfoPage;
