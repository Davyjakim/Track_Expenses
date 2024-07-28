import React, { useState } from "react";
import RecordExpesense from "../../assets/RecordExpenses.svg";
import PreviewExpenses from "../../assets/PreviewExpenses.svg";
import HowItWoks from "../../pages/HowItWoks";
import { FaQuestionCircle } from "react-icons/fa";
function BodyLoggedOut() {
  const [isopen, setisopen] = useState(false);

  return (
    <div className=" relative md:flex p-4 sm:flex-col md:flex-row md:justify-evenly md:text-[20px]  items-center">
      <button className="absolute top-0 hover:scale-105 right-9" onClick={()=>{
        setisopen(true)
      }}>
        <div className="flex items-center gap-2">
          <div>how it works</div>
          <FaQuestionCircle />
        </div>
      </button>
      {isopen && <HowItWoks setisopen={setisopen} />}
      <div className="flex flex-col items-center mb-8 md:mb-0">
        <img
          className="max-w-screen"
          src={RecordExpesense}
          alt="record expenses"
        />
        <div className="flex flex-col items-center gap-3 mt-4">
          <span className="text-center text-xl font-semibold">
            Record Your Expenses Here
          </span>
          <a
            className="bg-gradient-to-l from-blue-600 to-purple-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            href="/weeklyexpenses"
          >
            Record
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img
          className="max-w-screen"
          src={PreviewExpenses}
          alt="Preview expenses"
        />
        <div className="flex flex-col items-center gap-3 mt-4">
          <span className="text-center text-xl font-semibold">
            Preview Your Expenses Here
          </span>
          <a
            className="bg-gradient-to-bl from-blue-500 to-purple-800  text-white font-bold py-2 px-4 rounded"
            href="/previewexpenses"
          >
            Preview
          </a>
        </div>
      </div>
    </div>
  );
}

export default BodyLoggedOut;
