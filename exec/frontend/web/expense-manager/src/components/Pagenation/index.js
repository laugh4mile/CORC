import React, { useEffect, useState } from "react";
import _ from "./style.css";

const Page = ({ totalElements, blockSize, number, size, onClick }) => {
  const endPage = Math.ceil(totalElements / size);
  const [page, setPage] = useState([]);

  useEffect(() => {
    const startPage = Math.floor(number / blockSize) * blockSize + 1;
    const rs = Array.from(
      { length: Math.min(blockSize, endPage - startPage + 1) },
      (_, index) => startPage + index
    );

    setPage(rs);
  }, [number]);

  return (
    <div className="out">
      <button
        className="in"
        disabled={number == 0}
        onClick={() => onClick({ size, page: 0 })}
      >
        «
      </button>
      <button
        className="in"
        disabled={number == 0}
        onClick={() => onClick({ size, page: number - 1 })}
      >
        ‹
      </button>
      {page.map((el) => (
        <button
          className="in"
          disabled={number == el - 1}
          key={el}
          onClick={() => onClick({ size, page: el - 1 })}
        >
          {el}
        </button>
      ))}
      <button
        className="in"
        disabled={number == endPage - 1}
        onClick={() => onClick({ size, page: number + 1 })}
      >
        ›
      </button>
      <button
        className="in"
        disabled={number == endPage - 1}
        onClick={() => onClick({ size, page: endPage - 1 })}
      >
        »
      </button>
    </div>
  );
};

export default Page;
