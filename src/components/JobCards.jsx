// JobCards.jsx
/* eslint-disable react/prop-types */
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import JobCard from "./JobCard";

function JobCards(props) {
  const items = props.apiData;
  const itemsPerPage = 4;

  const [itemOffset, setItemOffset] = useState(props.pagination);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <>
        {currentItems.map((item, i) => {
          return <JobCard key={i} data={item} pagination={itemOffset} />;
        })}
      </>
      <ReactPaginate
        breakLabel={
          <span className="w-10 h-10 mr-4 flex items-center justify-center bg-lightGray rounded-md active:bg-primary active:text-white hover:border-2 hover:border-primary hover:text-primary border border-solid border-lightGray">
            ...
          </span>
        }
        nextLabel={
          <span className="w-10 h-10 mr-4 flex items-center justify-center bg-lightGray rounded-md active:bg-primary active:text-white hover:border-2 hover:border-primary hover:text-primary border border-solid border-lightGray">
            <BiChevronRight />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel={
          <span className="w-10 h-10  mr-4 flex items-center justify-center bg-lightGray rounded-md active:bg-primary active:text-white hover:border-2 hover:border-primary hover:text-primary border border-solid border-lightGray">
            <BiChevronLeft />
          </span>
        }
        renderOnZeroPageCount={null}
        activeClassName="bg-primary text-white"
        containerClassName="flex items-center justify-end flex-wrap gap-2 mt-8 mb-4"
        pageClassName="block border border-solid w-10 h-10 flex items-center justify-center rounded-md mr-4 hover:border-2 hover:border-primary"
      />
    </>
  );
}

export default JobCards;
