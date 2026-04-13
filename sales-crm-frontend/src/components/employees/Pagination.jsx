import React from "react";

function Pagination({ total, perPage, page, setPage }) {
  const pages = Math.ceil(total / perPage);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>

      {[...Array(pages)].map((_, i) => (
        <button
          key={i}
          className={page === i + 1 ? "active" : ""}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}

export default Pagination;