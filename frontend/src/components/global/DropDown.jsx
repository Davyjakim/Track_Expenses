import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";

function Dropdown(props) {
  const { title, description } = props;
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="max-w-full md:max-w-[700px] mx-auto ">
      <div
        className="flex justify-between items-center bg-white hover:bg-[#EAECF5] active:bg-[#EAECF5] rounded-lg p-2 cursor-pointer transition-all duration-300"
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        <span className="text-lg font-semibold">{title}</span>
        <div>
          {isShow ? (
            <RiArrowDropDownLine size={40} />
          ) : (
            <RiArrowDropRightLine size={40} />
          )}
        </div>
      </div>
      {isShow && (
        <div className="border-b rounded-md px-2 py-2 bg-slate-100 transition-all duration-300">
          <div>{description}</div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
