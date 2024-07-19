import React from "react";

function ExpenseDisplay(props) {
    const {
      startdate,
      enddate,
      amountspent,
      currency
      } = props;
  return (
    <div className="flex flex-col gap-6 bg-[#FBEEE4] m-4 py-3 rounded-md">
      <div className="flex justify-around">
        <div className="text-lg flex gap-4">
          <h1>start date:</h1>
          <span>{startdate}</span>
        </div>
        <div className="text-lg flex gap-4">
          <h1>End date:</h1>
          <span>{enddate}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h1>
            Amount Spent:
        </h1>
        <p className="font-bold">
            {amountspent}{" "}
            {currency}
        </p>
      </div>
    </div>
  );
}

export default ExpenseDisplay;
