import classNames from "classnames";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";

const Pagination = ({ className }) => {
  return (
    <div className={classNames("flex gap-x-1.5 mt-4 justify-end", className)}>
      <button className="w-9 h-9 hover:bg-[#dee2e6] hover:border-[#dee2e6] text-sm text-[#8898aa] rounded-full flex items-center justify-center border border-[#dee2e6]">
        <FaChevronLeft />
      </button>

      <button
        className={classNames(
          "w-9 h-9 hover:bg-[#dee2e6] hover:border-[#dee2e6] text-[#8898aa] rounded-full flex items-center justify-center border border-[#dee2e6]",
          {
            "!text-white bg-primary !border-primary": true,
          },
        )}
      >
        1
      </button>
      <button
        className={classNames(
          "w-9 h-9 hover:bg-[#dee2e6] hover:border-[#dee2e6] text-[#8898aa] rounded-full flex items-center justify-center border border-[#dee2e6]",
        )}
      >
        2
      </button>
      <button
        className={classNames(
          "w-9 h-9 hover:bg-[#dee2e6] hover:border-[#dee2e6] text-[#8898aa] rounded-full flex items-center justify-center border border-[#dee2e6]",
        )}
      >
        3
      </button>
    </div>
  );
};

export default Pagination;
