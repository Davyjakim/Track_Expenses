import React from "react";

function TotatAmountSpentDisplay(props) {
  const {
    startdateTimeframe,
    enddateTimeframe,
    weeklyTotal,
    monthExpenses,
    currency
    } = props;
  return (
    <div className="flex flex-col gap-6 bg-[#FBEEE4] m-4 py-3 rounded-md">
      <div className="flex justify-around">
        <div className="text-lg flex gap-4">
          <h1>start date:</h1>
          <span>{startdateTimeframe}</span>
        </div>
        <div className="text-lg flex gap-4">
          <h1>End date:</h1>
          <span>{enddateTimeframe}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h1>Total Amont Spent In the given Time-Frame</h1>
        <div className="flex gap-3">
          <h1>Weekly Total:</h1>
          <p className="font-bold">{weeklyTotal} {currency}</p>
        </div>
        <div className="flex gap-3">
          <h1>Expenses this month:</h1>
          <p className="font-bold">{monthExpenses} {currency}</p>
        </div>
        <div className="flex gap-3">
          <h1>Total:</h1>
          <p className="font-bold">{Math.round((weeklyTotal+monthExpenses)*100)/100} {currency}</p>
        </div>
      </div>
    </div>
  );
}

export default TotatAmountSpentDisplay;
