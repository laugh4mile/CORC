import React, { useEffect, useState } from "react";
import classes from "./Page.module.css";

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
  }, [number, blockSize, endPage]);

  return (
    <div className={classes.buttons}>
      <button
        className={classes.navBtn}
        disabled={number === 0}
        onClick={() => onClick({ size, page: 0 })}
      >
        «
      </button>
      <button
        className={classes.navBtn}
        disabled={number === 0}
        onClick={() => onClick({ size, page: number - 1 })}
      >
        ‹
      </button>
      {page.map((el) => (
        <button
          className={classes.pageBtn}
          disabled={number === el - 1}
          key={el}
          onClick={() => onClick({ size, page: el - 1 })}
        >
          {el}
        </button>
      ))}
      <button
        className={classes.navBtn}
        disabled={number === endPage - 1}
        onClick={() => onClick({ size, page: number + 1 })}
      >
        ›
      </button>
      <button
        className={classes.navBtn}
        disabled={number === endPage - 1}
        onClick={() => onClick({ size, page: endPage - 1 })}
      >
        »
      </button>
    </div>
  );
};

export default Page;
