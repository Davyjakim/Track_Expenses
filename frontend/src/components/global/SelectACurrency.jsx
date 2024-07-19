import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
const currencies = ["USD", "EUR", "PLN"];

function SelectCurrency(props) {
  const [selected, setselected] = useState("Select a currency");
  const [isclicked, setIsclicked] = useState(false);

const HandleCurrencyChange= (currency)=>{
    setselected(currency);
    props.OnCurrencyChange(currency)
}
  
  return (
    <div className="flex justify-center items-center mt-4">
    <div className="relative font-medium">
      <div
        className="bg-[#FBEEE4] flex items-center w-[200px] p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer transition-all duration-200"
        onClick={() => setIsclicked(!isclicked)}
      >
        <div className="flex-grow">{selected ? selected : "Select a currency"}</div>
        {isclicked ? (
          <RiArrowDropUpLine size={24} />
        ) : (
          <RiArrowDropDownLine size={24} />
        )}
      </div>
      <ul
        className={`absolute left-0 right-0 bg-[#FBEEE4] border border-gray-300 rounded-md shadow-md mt-1 max-h-48 overflow-y-auto transition-all duration-200 ${
          isclicked ? "block" : "hidden"
        }`}
      >
        {currencies.map((c) => (
          <li
            className="px-4 py-2 hover:bg-slate-400 active:bg-slate-600 cursor-pointer"
            key={c}
            onClick={() => {
              HandleCurrencyChange(c);
              setIsclicked(false);
            }}
          >
            {c}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
}

export default SelectCurrency;
