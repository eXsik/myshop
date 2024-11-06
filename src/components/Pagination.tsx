import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-indigo-500 text-white py-2 px-4 cursor-pointer rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        &laquo;
      </button>
      <span>
        Strona {currentPage} z {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-indigo-500 text-white py-2 px-4 cursor-pointer rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        &raquo;
      </button>
    </div>
  );
};
